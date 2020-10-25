import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Document} from '../../shared/models/document.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  @Input() row: Document;
  length: any;
  pageIndex: any;
  pageSize: any;
  pageEvent: void;

  alternativeText = 'No pages scanned or found.';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
    this.pageSize = 1;
    this.pageIndex = 0;
    // console.log('Page data:', this.row);
    if (this.row !== null) {
      this.length = this.row.pages !== null ? this.row.pages.length : 0;
    } else {
      this.length = 0;
      this.paginator.pageSize = this.pageSize;
    }

  }

  getServerData(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
