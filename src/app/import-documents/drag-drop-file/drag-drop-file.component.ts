import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drag-drop-file',
  templateUrl: './drag-drop-file.component.html',
  styleUrls: ['./drag-drop-file.component.scss']
})
export class DragDropFileComponent implements OnInit {

  @Input() filesToUpload: File[];

  files: any = [];

  constructor() {
  }

  ngOnInit(): void {
  }


  uploadFile(event) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {

      const element = event[index];
      this.files.push(element.name);
      this.filesToUpload.push(element);

    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.filesToUpload.splice(index, 1);
  }

}
