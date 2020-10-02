import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';

@Component({
  selector: 'app-doc-extended-view',
  templateUrl: './doc-extended-view.component.html',
  styleUrls: ['./doc-extended-view.component.scss']
})
export class DocExtendedViewComponent implements OnInit {

  @Input() row: Document;

  constructor() {
  }

  ngOnInit(): void {
  }
}
