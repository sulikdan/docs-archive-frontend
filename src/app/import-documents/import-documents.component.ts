import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from './file-upload.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DocConfig} from '../shared/models/doc-config.model';
import {DocumentService} from '../documents/document.service';
import {MessageService} from '../shared/services/message.service';

/**
 * Component, where is dealt with import of files.
 */
@Component({
  selector: 'app-import-documents', templateUrl: './import-documents.component.html'
})
export class ImportDocumentsComponent implements OnInit {

  // @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  languagesMap: Map<string, string>;

  isErrorUploading = false;

  isSubmiting = false;
  isMaximumBatches = false;
  waitForLastBatchToBeFilled = false;

  isEmpty = true;

  batchDocsCount = 1;

  filesSelected: File[][] = [null];

  docBatches: FormArray;

  constructor(private fileUploadService: FileUploadService, private documentService: DocumentService,
              private messageService: MessageService) {
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
      const extension = htmlInputElement.files[i].name.split('.').pop();
      if (extension !== 'jpg' && extension !== 'png' && extension !== 'tiff' && extension !== 'pdf') {
        this.messageService.error('Extension ' + extension + ' is not supported, please choose file with file format:\n'
          + 'jpg, tiff, png or pdf.');

        return;
      }
      fileArr.push(htmlInputElement.files[i]);
    }

    this.isEmpty = false;
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
            console.log('Error happend:', error.error);
            this.isErrorUploading = true;
            this.isSubmiting = false;
            this.messageService.error('Unexpected error occured, while trying to upload documents.');

            setTimeout(() => {
              this.isErrorUploading = false;
            }, 5000);

          }, () => {
            console.log('Uploaded complete!');
            this.isSubmiting = false;
            this.messageService.success('Document/s uploading was successful.');
          }
        );

      } else {
        console.log('Shouldn\'t happen!');
      }
    }

    this.docBatches.clear();
    this.isEmpty = true;
    this.docBatches.push(this.createForm(null));
    // this.fileInput.nativeElement.value = '';
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
