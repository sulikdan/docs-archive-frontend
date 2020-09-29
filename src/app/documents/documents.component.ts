import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DocumentService} from './document.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Document} from '../shared/document.model';
import {Subscription} from 'rxjs';
import {Page} from '../shared/page.model';

// import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
import {DocumentEditComponent} from './document-edit/document-edit.component';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  // NEW
  // data: Document[] = [];

  resultsLength = 0;
  // isLoadingResults = false;


  // OLD
  newDataSub: Subscription;

  pageSize: number;
  pageIndex: number;
  totalSize: number;

  documents: Document[];

  loadingIndicator = false;
  expandedElement: Document | null;
  // https://www.freakyjolly.com/angular-material-table-operations-using-dialog/
  displayedColumns = ['id', 'origName', 'createDateTime', 'updateDateTime', 'documentProcessStatus', 'action'];

  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private documentService: DocumentService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pageSize = 5;
    this.pageIndex = 0;
  }

  ngAfterViewInit() {

    this.paginator.pageSize = this.pageSize;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.newDataSub = this.documentService.newDataReceivedSubject.subscribe((data: Page) => {
      if (data) {
        data = JSON.parse(JSON.stringify(data));
        this.totalSize = data.totalElements;
        this.documents = data.content;
        this.dataSource = new MatTableDataSource<Document>(this.documents);
        this.dataSource.sort = this.sort;
      }
      this.loadingIndicator = false;
    });


    this.fetchDocuments(data => {
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DocumentEditComponent, {
      width: '600px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Update') {
        const documentToUpdate = result.data as Document ;
        console.log(result, '\n', result.data);
        this.documentService.patchDocument(documentToUpdate, this.pageIndex).subscribe(
          value => {
            this.loadingIndicator = true;
            this.fetchDocuments(data => {
              setTimeout(() => {
                this.loadingIndicator = false;
              }, 9500);
            });
          }
        );
      } else if (result.event === 'Delete') {
        this.loadingIndicator = true;
        this.documentService.deleteDocument(result.data.id).subscribe(
          value => {
            // Deleting and waiting to reload page
            this.fetchDocuments(data => {
              setTimeout(() => {
                this.loadingIndicator = false;
              }, 9500);
            });
          }
        );
      }
    });
  }

  updateRowData(rowObj) {
    this.documents = this.documents.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.origName = rowObj.name;
      }
      return true;
    });
  }

  deleteRowData(rowObj) {
    this.documents = this.documents.filter((value, key) => {
      return value.id !== rowObj.id;
    });
  }

  send(row: any) {

  }

  getServerData(event?: PageEvent) {
    console.log('Table data: \n pageSize:' + event.pageSize + '\n pageIndex:' + this.pageIndex + '\n totalSize:' + this.totalSize);

    // this.pageSize =
    if (event !== null) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }

    console.log('Changed page size...');
    this.fetchDocuments(data => {
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 9500);
    });
  }

  fetchDocuments(callback) {
    this.loadingIndicator = true;

    // TODO record subscriptioN??
    this.documentService.getDocuments(this.pageIndex, this.pageSize);
  }

  ngOnDestroy() {
    this.newDataSub.unsubscribe();
  }

}
