import {Component, OnInit} from '@angular/core';
import {FileUploadService} from './file-upload.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DocConfig} from '../shared/doc-config.model';
import {DocumentService} from '../documents/document.service';

@Component({
  selector: 'app-import-documents', templateUrl: './import-documents.component.html'
})
export class ImportDocumentsComponent implements OnInit {

  languagesMap: Map<string, string>;

  isErrorUploading = false;

  isSubmiting = false;
  isMaximumBatches = false;
  waitForLastBatchToBeFilled = false;

  batchDocsCount = 1;

  filesSelected: File[][] = [null];

  docBatches: FormArray;

  constructor(private fileUploadService: FileUploadService, private documentService: DocumentService) {
  }


  ngOnInit(): void {
    this.languagesMap = this.documentService.languagesMap;

    this.docBatches = new FormArray([]);

    this.docBatches.push(this.createForm(null));

    this.docBatches.statusChanges.subscribe(value => {
      console.log(value);
    });

  }

  onFileChange(event: Event, index: number) {
    const htmlInputElement = event.target as HTMLInputElement;
    console.log('On file change called: ' + htmlInputElement);

    const fileArr: File[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < htmlInputElement.files.length; i++) {
      fileArr.push(htmlInputElement.files[i]);
    }

    this.filesSelected[index] = fileArr;
  }

  getControls() {
    return this.docBatches.controls;
  }

  onSubmitDocs() {

    for (let i = 0; i < this.docBatches.length; i++) {
      this.isSubmiting = true;

      const control = this.docBatches.at(i);
      if (control instanceof FormGroup) {
        // is a FormGroup
        console.log('FormGroup');

        const form = control as FormGroup;
        console.log('File content:');

        const docConfig = new DocConfig();
        docConfig.lang = form.get('language').value;
        docConfig.scanImmediately = form.get('scanImmediately').value;
        docConfig.highQuality = form.get('highQuality').value;
        docConfig.multiPage = form.get('multipaged').value;

        console.log(docConfig);

        this.fileUploadService.postFile(this.filesSelected[i], docConfig).subscribe(data => {
            console.log('Looks all good: ', data);
          }, error => {
            console.log('Error happend:', error);
            this.isErrorUploading = true;
            this.isSubmiting = false;

            setTimeout(() => {
              this.isErrorUploading = false;
            }, 10000);

          }, () => {
            console.log('Uploaded complete!');
            this.isSubmiting = false;
          }
        );

      } else {
        console.log('Shouldn\'t happen!');
      }
    }

    this.docBatches.clear();
    this.docBatches.push(this.createForm(null));
    this.filesSelected = [null];
  }

  onAddBatch() {
    if (!(this.docBatches.at(this.docBatches.length - 1) as FormGroup).get('file').dirty) {
      this.waitForLastBatchToBeFilled = true;
      return;
    }

    this.waitForLastBatchToBeFilled = false;

    if (this.docBatches.length > 5) {
      this.isMaximumBatches = true;
      return;
    }

    this.docBatches.push(this.createForm(this.docBatches.at(this.docBatches.length - 1) as FormGroup));
    this.filesSelected.push(null);
  }

  createForm(data: FormGroup) {
    let form = new FormGroup({
      file: new FormControl(),
      highQuality: new FormControl(false),
      scanImmediately: new FormControl(false),
      multipaged: new FormControl(false),
      language: new FormControl('eng')
    });


    if (data) {
      // form.patchValue(data);
      form = new FormGroup({
        file: new FormControl(),
        highQuality: new FormControl(data.get('highQuality').value),
        scanImmediately: new FormControl(data.get('scanImmediately').value),
        multipaged: new FormControl(data.get('multipaged').value),
        language: new FormControl(data.get('language').value)
      });
      console.log('coopied?');
    }

    return form;
  }
}
