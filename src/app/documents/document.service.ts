import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    endpoint = 'http://localhost:8081/api/documents/';

    constructor(private http: HttpClient) {
    }


    getDocument(id: string) {
        //    TODO
    }

    getDocuments() {

        // const formData: FormData = new FormData();
        // for (const file of filesToUpload) {
        //     console.log(file.name);
        //     formData.append('files', file, file.name);
        // }
        //
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         lang: docConfig.lang,
        //         multiPageFile: String(docConfig.multiPage),
        //         highQuality: String(docConfig.highQuality),
        //         scanImmediately: String(docConfig.scanImmediately)
        //     })
        // };

        return this.http.get<Document[]>(this.endpoint);
        // , formData, httpOptions);
        // .post(endpoint, formData, { headers: yourHeadersConfig })
        // .pipe(map(data => {
        //     data.json();
        // }), catchError(errorRes => {
        //     // Send to analytics server
        //     return throwError(errorRes);
        // }));
    }
}
