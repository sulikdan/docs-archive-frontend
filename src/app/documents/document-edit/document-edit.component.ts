import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DocumentService} from '../document.service';
import {Document} from '../../shared/document.model';

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
    // this.documentFormGroup = new FormGroup({
    //     id: new FormControl({value: this.documentToEdit.id, disabled: true}), // disabled
    //     origName: new FormControl({value: this.documentToEdit.id, disabled: true}), // disabled
    //     documentType: new FormControl({value: this.documentToEdit.documentType}),
    //     createDateTime: new FormControl(), // invisible
    //     updateDateTime: new FormControl(), // invisible
    //     docState: new FormControl(),
    //     docConfig: new FormGroup({
    //       highQuality: new FormControl(),
    //       multiPage: new FormControl(),
    //       lang: new FormControl(),
    //       scanImmediately: new FormControl()
    //     })
    //   }
    // );

    this.docStates = this.documentService.changableDocStatesList;
    this.languagesMap = this.documentService.languagesMap;
    this.docTypeList = this.documentService.docTypeList;
  }

  doAction({value, valid}: { value: Document, valid: boolean }) {
    console.log('Doing action', value, valid, this.action);
    if (this.action !== 'Delete') {
      // this.documentToEdit.id = value.id;
      // this.documentToEdit.origName = value.origName;
      this.documentToEdit.docType = value.docType;
      this.documentToEdit.docState = value.docState;
      this.documentToEdit.docConfig.highQuality = value.docConfig.highQuality;
      this.documentToEdit.docConfig.multiPage = value.docConfig.multiPage;
      this.documentToEdit.docConfig.lang = value.docConfig.lang;
      this.documentToEdit.docConfig.scanImmediately = value.docConfig.scanImmediately;

      console.log('reassgined values: ', JSON.stringify(this.documentToEdit));
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

}
