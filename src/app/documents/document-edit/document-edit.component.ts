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
  }

  doAction({value, valid}: { value: Document, valid: boolean }) {
    console.log('Doing action', value, valid);
    this.dialogRef.close({event: this.action, data: this.documentToEdit});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
