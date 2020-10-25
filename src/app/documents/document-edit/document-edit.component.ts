import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DocumentService} from '../document.service';
import {Document} from '../../shared/models/document.model';
import {DocConfig} from '../../shared/models/doc-config.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {

  action: string;
  localData: any;
  public documentToEdit: Document;

  languagesMap: Map<string, string>;
  docStates: string[];
  docTypeList: string[];

  additionalTags: string [];

  // documentFormGroup: FormGroup;

  constructor(
    private documentService: DocumentService,
    public dialogRef: MatDialogRef<DocumentEditComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Document) {
    console.log(data);
    this.documentToEdit = data;
    this.localData = {...data};
    this.action = this.localData.action;
  }

  ngOnInit() {
    this.docStates = this.documentService.changableDocStatesList;
    this.languagesMap = this.documentService.languagesMap;
    this.docTypeList = this.documentService.docTypeList;
    this.additionalTags = [];
  }

  doAction({value, valid}: { value: Document, valid: boolean }) {
    console.log('Doing action', value, valid, this.action);
    if (this.action === 'Update') {

      // const updatedDoc = new Document();
      // updatedDoc.id = this.documentToEdit.id;
      // updatedDoc.origName = this.documentToEdit.origName;
      // updatedDoc.isShared = this.documentToEdit.isShared;
      // updatedDoc.isOwner = this.documentToEdit.isOwner;
      // updatedDoc.pages = this.documentToEdit.pages;
      // updatedDoc.docType = value.docType;
      // updatedDoc.docState = value.docState;
      // updatedDoc.docConfig = new DocConfig();
      // updatedDoc.docConfig.highQuality = value.docConfig.highQuality;
      // updatedDoc.docConfig.multiPage = value.docConfig.multiPage;
      // updatedDoc.docConfig.lang = value.docConfig.lang;
      // updatedDoc.docConfig.scanImmediately = value.docConfig.scanImmediately;
      // updatedDoc.tags = [];
      // this.documentToEdit.tags.forEach(
      //   value1 => {
      //     updatedDoc.tags.push(value1);
      //   }
      // );
      //
      // this.additionalTags.forEach(
      //   value1 => {
      //     updatedDoc.tags.push(value1);
      //   }
      // );
      // this.documentToEdit.id = value.id;
      // this.documentToEdit.origName = value.origName;
      this.documentToEdit.docType = value.docType;
      this.documentToEdit.docState = value.docState;
      this.documentToEdit.docConfig.highQuality = value.docConfig.highQuality;
      this.documentToEdit.docConfig.multiPage = value.docConfig.multiPage;
      this.documentToEdit.docConfig.lang = value.docConfig.lang;
      this.documentToEdit.docConfig.scanImmediately = value.docConfig.scanImmediately;

      this.additionalTags.forEach(value1 => {
        this.documentToEdit.tags.push(value1);
      });

      console.log('reassgined values: ', this.documentToEdit);
      // TODO fill tags
      // this.documentToEdit.tags = value.tags;

      this.dialogRef.close({event: this.action, data: this.documentToEdit});
    } else {
      this.dialogRef.close({event: this.action, data: this.documentToEdit});
    }
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }


  removeItemFromNewTags(index: number) {
    if (index >= 0) {
      this.additionalTags.splice(index, 1);
    }
  }

  removeItemFromCurrentTags(index: number) {
    if (index >= 0) {
      this.documentToEdit.tags.splice(index, 1);
    }
  }

  onAddClick(event: Event) {
    let providedValue;

    providedValue = (document.getElementById('newTags') as HTMLInputElement).value;

    if (this.documentToEdit.tags.indexOf(providedValue) === -1 && this.additionalTags.indexOf(providedValue) === -1) {
      this.additionalTags.push(providedValue);
    }

    (document.getElementById('newTags') as HTMLInputElement).value = '';
  }
}
