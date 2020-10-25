import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {

  @Input() row: Document;

  imageSource: any;

  constructor(private sanitizer: DomSanitizer) {
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

}
