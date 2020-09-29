import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Document} from '../shared/document.model';
import {Page} from '../shared/page.model';
import {SearchDocParams} from '../shared/search-doc-params.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  languagesMap = new Map([
    ['eng', 'English'],
    ['svk', 'Slovak'],
    ['czk', 'Czech']
  ]);

  docStatesList = ['WAITING_TO_SEND',
    'MANUAL_SENDING',
    'PROCESSING',
    'SCANNED',
    'RESOURCE_TO_CLEAN',
    'COMPLETED'];

  changableDocStatesList = ['WAITING_TO_SEND',
    'MANUAL_SENDING',
    'COMPLETED'];

  docTypeList = [
    'IMG',
    'PDF'
  ];

  newDataReceivedSubject: Subject<Page>;

  endpoint = 'http://localhost:8081/api/documents/';

  allDocumentList: Document[];
  currSearchDocParams: SearchDocParams;

  totalElements: number;
  currPageSize = 1;
  currIndex = 0;

  constructor(private http: HttpClient) {
    this.allDocumentList = [];
    this.currSearchDocParams = new SearchDocParams();
    this.newDataReceivedSubject = new Subject<Page>();
  }

  patchDocument(doc: Document, docInPageIndex: number) {
    console.log('Doc values:', doc.toString());
    // const headers = new HttpHeaders();
    const realDoc = new Document();
    realDoc.id = doc.id;
    realDoc.origName = doc.origName;
    realDoc.docType = doc.docType;
    realDoc.createDateTime = doc.createDateTime;
    realDoc.updateDateTime = doc.updateDateTime;
    realDoc.asyncApiInfo = doc.asyncApiInfo;
    realDoc.docState = doc.docState;
    realDoc.docConfig = doc.docConfig;
    // realDoc.tags = doc.tags;
    realDoc.pages = doc.pages;

    // headers.append('Content-type', 'application/json');
    const body = {resource: JSON.stringify(realDoc)};

    // return this.http.patch<Document>(this.endpoint + doc.id, JSON.stringify(doc));
    return this.http.patch<Document>(this.endpoint + realDoc.id, realDoc);
  }

  getDocument(id: string) {
    return this.http.get<Document>(this.endpoint + id);
  }

  searchDocuments(searchDocParams: SearchDocParams) {

  }

  deleteDocument(id: string) {
    return this.http.delete(this.endpoint + id);
  }

  getDocuments(pageIndex: number, pageSize: number) {

    // Object.assign([], myArray);

    if (pageIndex === 0 && pageSize === 0) {
      pageIndex = this.currIndex;
      pageSize = this.currPageSize;
    } else if (pageSize === 0) {
      pageSize = this.currPageSize = 1;
    } else {
      this.currIndex = pageIndex;
      this.currPageSize = pageSize;
    }

    this.currSearchDocParams.pageIndex = pageIndex;
    this.currSearchDocParams.pageSize = pageSize;

    this.fetchDocuments(this.currSearchDocParams);
  }

  fetchDocuments(searchDocParams: SearchDocParams) {
    // const headers = new HttpHeaders();
    // headers.append('Content-type', 'application/json');

    const data = {searchDocParams: JSON.stringify(searchDocParams)};

    console.log('Stringified data: ');
    console.log(JSON.stringify(searchDocParams));

    this.http.get<Page>(this.endpoint, {params: data}).subscribe((pageData: Page) => {

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
