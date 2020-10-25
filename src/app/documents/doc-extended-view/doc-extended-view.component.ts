import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-doc-extended-view',
  templateUrl: './doc-extended-view.component.html',
  styleUrls: ['./doc-extended-view.component.scss']
})
export class DocExtendedViewComponent implements OnInit {

  @Input() row: Document;
  @Input() showUpdateDate = true;
  @Input() showCreationDate = true;
  @Input() showOrigName = true;

  languageMap: Map<string, string>;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.languageMap = this.documentService.languagesMap;
  }
}
