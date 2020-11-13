import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Document} from '../shared/models/document.model';
import {Page} from '../shared/models/page.model';
import {SearchDocParams} from '../shared/models/search-doc-params.model';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

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

  private readonly serverUrl: string;

  endpoint: string;

  allDocumentList: Document[];
  currSearchDocParams: SearchDocParams;

  totalElements: number;
  currPageSize = 1;
  currIndex = 0;

  constructor(private http: HttpClient) {
    this.allDocumentList = [];
    this.currSearchDocParams = new SearchDocParams();
    this.newDataReceivedSubject = new Subject<Page>();
    this.serverUrl = 'http://' + environment.backend.address + ':' + environment.backend.port;
    this.endpoint = this.serverUrl + '/api/documents/';
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
    if (doc.tags !== null && doc.tags !== undefined) {
      realDoc.tags = doc.tags.slice();
    }

    if (doc.pages !== null && doc.pages !== undefined) {
      realDoc.pages = doc.pages.slice();
    }
    realDoc.isShared = doc.isShared;


    // headers.append('Content-type', 'application/json');
    // const body = {updateDoc: JSON.stringify(realDoc)};

    // return this.http.patch<Document>(this.endpoint + doc.id, {JSON.stringify(realDoc)});
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

    // console.log('Endpoint-Length:' + this.endpoint.length);
    // const doc = new Document();
    // const params = {searchDocParams: JSON.stringify(doc)};
    // console.log('Search-doc_params:' + params.searchDocParams.length);
    // console.log('Search-doc_params:' + params.toString().length);

    // this.http.get<Page>(this.endpoint, {params}).subscribe(value => {
    // });

    const data = {searchDocParams: JSON.stringify(searchDocParams)};

    console.log('Stringified data: ');
    console.log(JSON.stringify(searchDocParams));

    this.http.get<Page>(this.endpoint, {params: data}).subscribe((pageData: any) => {

        console.log('working?', pageData);
        this.totalElements = pageData.totalElements;
        pageData.content.forEach(
          value => {
            value.fileUrl = value.links[1].href;
            // if (value.documentPreview != null && value.documentPreview.length > 0) {
            //   value.documentPreview = 'data:image/jpg;base64,' + value.documentPreview;
            // }
            const tmp = [];
            value.tags.forEach(value1 => {
              tmp.push(value1.tagType);
            });
            value.tags = tmp;
          }
        );

        this.allDocumentList = pageData.content;

        console.log('After changes', this.allDocumentList);

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
