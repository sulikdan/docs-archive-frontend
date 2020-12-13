import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DocumentService} from './document.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Document} from '../shared/models/document.model';
import {Subscription} from 'rxjs';
import {Page} from '../shared/models/page.model';
import {MatDialog} from '@angular/material/dialog';
import {DocumentEditComponent} from './document-edit/document-edit.component';
import {MessageService} from '../shared/services/message.service';

/**
 * Component containing documents data -> shown, when clicked on tab-documents.
 */
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
  // encapsulation: ViewEncapsulation.Emulated,
})
export class DocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  newDataSub: Subscription;

  pageSize: number;
  pageIndex: number;
  totalSize: number;

  documents: Document[];

  loadingIndicator = false;
  expandedElement: Document | null;
  // https://www.freakyjolly.com/angular-material-table-operations-using-dialog/
  displayedColumnsOriginal = ['id', 'origName', 'createDateTime', 'updateDateTime', 'documentProcessStatus', 'action'];
  // displayedColumnsChoices = [
  //   ['id', 'origName', 'createDateTime', 'updateDateTime', 'documentProcessStatus', 'action'],
  //   ['id', 'origName', 'createDateTime', 'documentProcessStatus', 'action'],
  //   ['id', 'origName', 'documentProcessStatus', 'action'],
  //   ['id', 'documentProcessStatus', 'action']
  // ];

  displayedColumnsChoices = [
    ['Id', 'Original name', 'Created date', 'Updated date', 'Scanning status', 'Actions'],
    ['Id', 'Original name', 'Created date', 'Scanning status', 'Actions'],
    ['Id', 'Original name', 'Scanning status', 'Actions'],
    ['Id', 'Scanning status', 'Actions']
  ];

  columnsDictionary = {
    Id: 'id',
    'Original name': 'origName',
    'Created date': 'createDateTime',
    'Updated date': 'updateDateTime',
    'Scanning status': 'documentProcessStatus',
    Actions: 'action'
  };

  displayedColumnsCurrent = [];

  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();

  showUpdateDate = false;
  showCreationDate = false;
  showOrigName = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private documentService: DocumentService, public dialog: MatDialog, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.displayedColumnsCurrent = this.displayedColumnsChoices[0];
  }

  ngAfterViewInit() {

    this.paginator.pageSize = this.pageSize;

    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.newDataSub = this.documentService.newDataReceivedSubject.subscribe((data: Page) => {
      if (data) {
        data = JSON.parse(JSON.stringify(data));
        this.totalSize = data.totalElements;
        this.documents = data.content;
        this.dataSource = new MatTableDataSource<Document>(this.documents);
        // this.dataSource.sort = this.sort;
      }
      this.loadingIndicator = false;
    });


    this.fetchDocuments(() => {
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  openDialog(action, obj) {
    if (!obj.isOwner) {
      return;
    }

    obj.action = action;
    const dialogRef = this.dialog.open(DocumentEditComponent, {
      width: '600px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Update') {
        const documentToUpdate = result.data as Document;
        console.log('Dunno', result, '\n', result.data);
        this.documentService.patchDocument(documentToUpdate, this.pageIndex).subscribe(
          () => {
            this.loadingIndicator = true;
            this.fetchDocuments(() => {
              setTimeout(() => {
                this.loadingIndicator = false;
              }, 9500);
            });
          }, error => {
            console.log('Error while patching:', error.error);
            this.messageService.error('Unexpected error occurred, while trying to update provided changes.');
          }, () => {
            this.messageService.success('The document was successfully updated.');
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
          },
          () => {
            this.messageService.error('Unexpected error occurred, while trying to delete document.');
          },
          () => {
            this.messageService.success('The document was successfully deleted.');
          }
        );
      }
    });
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


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Inner width: ' + event.target.innerWidth);

    // Hiding update date
    if (event.target.innerWidth < 950) {
      this.showUpdateDate = true;
    } else {
      this.showUpdateDate = false;
    }

    // Hiding creation date
    if (event.target.innerWidth < 700) {
      this.showCreationDate = true;
    } else {
      this.showCreationDate = false;
    }

    // Hiding origName
    if (event.target.innerWidth < 500) {
      this.showOrigName = true;
    } else {
      this.showOrigName = false;
    }

    // show Column instead in special settigns
    if (this.showOrigName) {
      this.displayedColumnsCurrent = this.displayedColumnsChoices[3];
    } else if (this.showCreationDate) {
      this.displayedColumnsCurrent = this.displayedColumnsChoices[2];
    } else if (this.showUpdateDate) {
      this.displayedColumnsCurrent = this.displayedColumnsChoices[1];
    } else {
      this.displayedColumnsCurrent = this.displayedColumnsChoices[0];
    }


    console.log('Settings: ', this.showOrigName, this.showCreationDate, this.showUpdateDate);
    console.log('displaying : ', this.displayedColumnsCurrent.toString());
  }

}
