import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DocumentService} from './document.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Document} from '../shared/document.model';
import {Subscription} from 'rxjs';
import {Page} from '../shared/page.model';


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

  newDataSub: Subscription;

  pageSize: number;
  pageIndex: number;
  totalSize: number;

  documents: Document[];

  loadingIndicator = false;
  expandedElement: Document | null;

  filterValues = {};
  filterSelectObj = [];

  // displayedColumns = ['id', 'origName', 'path', 'createDateTime', 'updateDateTime', 'documentProcessStatus'];
  displayedColumns = ['id', 'origName', 'createDateTime', 'updateDateTime', 'documentProcessStatus'];
  // columnsToDisplay = ['id', 'origName', 'createDateTime', 'updateDateTime'];

  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private documentService: DocumentService) {

    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'id',
        options: []
      }, {
        name: 'origName',
        columnProp: 'origName',
        options: []
      }, {
        name: 'createDateTime',
        columnProp: 'createDateTime',
        options: []
      }, {
        name: 'updateDateTime',
        columnProp: 'updateDateTime',
        options: []
      }, {
        name: 'documentProcessStatus',
        columnProp: 'documentProcessStatus',
        options: []
      }
    ];

  }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.pageSize = 2;
    this.pageIndex = 0;

    this.newDataSub = this.documentService.newDataReceivedSubject.subscribe((value: Page) => {
      if (value) {
        // this.totalSize = this.documentService.totalElements;
        // this.documents = this.documentService.allDocumentList;
        // this.dataSource = new MatTableDataSource<Document>(this.documents);
        this.totalSize = value.totalElements;
        this.documents = value.content;
        this.dataSource = new MatTableDataSource<Document>(this.documents);
      }
      this.loadingIndicator = false;
    });


    this.fetch(data => {
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });

    this.dataSource.filterPredicate = this.createFilter();
  }


  send(row: any) {

  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Called on Filter change
  filterChange(filter, event) {
    // let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  // Custom filter method fot Angular Material Datatable
  createFilter() {
    // tslint:disable-next-line:only-arrow-functions
    const filterFunction = function(data: any, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      const nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          // tslint:disable-next-line:forin
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) !== -1 && isFilterSet) {
                found = true;
              }
            });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }


  // Reset table filters
  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
  }

  getServerData(event?: PageEvent) {
    console.log('Table data: \n pageSize:' + event.pageSize + '\n pageIndex:' + this.pageIndex + '\n totalSize:' + this.totalSize);

    // this.pageSize =
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    console.log('Changed page size...');
    this.fetch(data => {
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 9500);
    });
  }

  fetch(callback) {
    this.loadingIndicator = true;

    // TODO record subscriptioN??
    this.documentService.getDocuments(this.pageIndex, this.pageSize);

    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
    });

  }

  ngOnDestroy() {
    this.newDataSub.unsubscribe();
  }
}
