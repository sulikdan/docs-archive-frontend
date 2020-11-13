import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {

  @Input() row: Document;

  imageSource: any;

  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    let objectURL;
    const extension = this.row.origName.split('.').pop();
    if (extension === 'jpeg' || extension === 'jpg' || extension === '.jfif') {
      objectURL = 'data:image/jpeg;base64,' + this.row.documentPreview;
    } else if (extension === 'png') {
      objectURL = 'data:image/png;base64,' + this.row.documentPreview;
    } else if (extension === 'tiff' || extension === 'tif') {
      objectURL = 'data:image/tiff;base64,' + this.row.documentPreview;
    } else {
      objectURL = 'data:image/jpeg;base64,' + this.row.documentPreview;
    }

    this.imageSource = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  downloadFile(fileUrl: string, origName: string) {
    this.httpClient.get(fileUrl, {responseType: 'blob'})
      .subscribe((res) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(res);
        a.download = origName;
        // start download
        a.click();
        window.URL.revokeObjectURL(fileUrl);
        a.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
        console.log('Completed file download.');
      });
  }
}
