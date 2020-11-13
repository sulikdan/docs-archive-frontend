import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocConfig} from '../shared/models/doc-config.model';
import {environment} from '../../environments/environment';

/**
 * Service for file work - sending files.
 */
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private readonly serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = 'http://' + environment.backend.address + ':' + environment.backend.port;
  }

  postFile(filesToUpload: File[], docConfig: DocConfig): Observable<Document> {

    const endpoint = this.serverUrl + '/api/documents/';

    const formData: FormData = new FormData();
    for (const file of filesToUpload) {
      console.log(file.name);
      formData.append('files', file, file.name);
    }

    // const params: URLSearchParams = new URLSearchParams();
    // params.set('lang', docConfig.lang);
    // params.set('multiPageFile', String(docConfig.multiPage));
    // params.set('highQuality', String(docConfig.highQuality));
    // params.set('scanImmediately', String(docConfig.scanImmediately));

    const httpOptions = {
      headers: new HttpHeaders({
        lang: docConfig.lang,
        multiPageFile: String(docConfig.multiPage),
        highQuality: String(docConfig.highQuality),
        scanImmediately: String(docConfig.scanImmediately)
      })
    };

    const params = new HttpParams()
      .set('lang', docConfig.lang)
      .set('multiPageFile', String(docConfig.multiPage))
      .set('highQuality', String(docConfig.highQuality))
      .set('scanImmediately', String(docConfig.scanImmediately));


    console.log('Http options: ' + httpOptions);

    return this.http.post<Document>(endpoint, formData, {params});
    // .post(endpoint, formData, { headers: yourHeadersConfig })
    // .pipe(map(data => {
    //     data.json();
    // }), catchError(errorRes => {
    //     // Send to analytics server
    //     return throwError(errorRes);
    // }));
  }
}
