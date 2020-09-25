import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Document} from '../shared/document.model';
import {Page} from '../shared/page.model';
import {SearchDocParams} from '../shared/search-doc-params.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  newDataReceivedSubject: Subject<Page>;

  endpoint = 'http://localhost:8081/api/documents/';

  allDocumentList: Document[];
  documentPages: [Document[]];
  currSearchDocParams: SearchDocParams;

  totalElements: number;
  currPageSize = 5;
  currIndex = 0;

  constructor(private http: HttpClient) {
    this.allDocumentList = [];
    this.documentPages = [[]];
    this.currSearchDocParams = new SearchDocParams();
    this.newDataReceivedSubject = new Subject<Page>();
  }

  changePagesSize(pageSize: number) {

    if (this.currPageSize === pageSize) {
      return;
    }

    const newPageCount = this.allDocumentList.length / pageSize;

    const rePagedDocLists: [Document[]] = [[]];
    let pageDocList: Document[] = [];
    for (let i = 0; i < this.allDocumentList.length; i++) {
      pageDocList.push(this.allDocumentList[i]);
      if (pageDocList.length % newPageCount === 0) {
        rePagedDocLists.push(pageDocList);
        pageDocList = [];
      }
    }

    this.documentPages = rePagedDocLists;
    this.currPageSize = pageSize;
  }

  patchDocument(doc: Document, docInPageIndex: number, pageIndex: number) {
    return this.http.patch<Document>(this.endpoint + doc.id, doc);
  }

  getDocument(id: string) {
    return this.http.get<Document>(this.endpoint + id);
  }

  searchDocuments(searchDocParams: SearchDocParams) {

  }

  getDocuments(pageIndex: number, pageSize: number) {

    // Object.assign([], myArray);

    if (pageIndex === null && pageSize === null) {
      pageIndex = this.currIndex;
      pageSize = this.currPageSize;
    } else {
      this.currIndex = pageIndex;
      this.currPageSize = pageSize;
    }

    if ((pageIndex + 1) * pageSize <= this.allDocumentList.length) {
      const pageData = new Page();
      pageData.totalElements = this.totalElements;
      pageData.content = [];

      for (let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++) {
        if (i >= this.allDocumentList.length) {
          break;
        }
        pageData.content.push(this.allDocumentList[i]);
      }

      pageData.size = pageData.content.length;
      pageData.numberOfElements = pageData.content.length;
      pageData.empty = pageData.content.length === 0;
      pageData.first = pageIndex === 0;
      // pageData.last = .fsaf.a. TODO


      this.newDataReceivedSubject.next(pageData);
      return;
    }

    this.currSearchDocParams.pageIndex = pageIndex;
    this.currSearchDocParams.pageSize = pageIndex;

    this.fetchDocuments(this.currSearchDocParams);
  }

  fetchDocuments(searchDocParams: SearchDocParams) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    const data = {searchDocParams: JSON.stringify(searchDocParams)};

    console.log('Stringified data: ');
    console.log(JSON.stringify(searchDocParams));

    this.http.get<Page>(this.endpoint, {params: data, headers}).subscribe((pageData: Page) => {

        console.log('working?', pageData);
        this.totalElements = pageData.totalElements;
        this.allDocumentList = pageData.content;
        this.newDataReceivedSubject.next(pageData);

      }, error => {
        console.log('Error loading data..', error);
        this.newDataReceivedSubject.next(null);
        // this.newDataReceivedSubject.next(false);
      }, () => {
        console.log('Finished getting files!');
        // this.newDataReceivedSubject.next(true);
      }
    );
  }

}
