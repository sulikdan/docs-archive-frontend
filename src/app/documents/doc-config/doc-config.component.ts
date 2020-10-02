import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';

@Component({
  selector: 'app-doc-config',
  templateUrl: './doc-config.component.html',
  styleUrls: ['./doc-config.component.scss']
})
export class DocConfigComponent implements OnInit {

  @Input() row: Document;

  constructor() {
  }

  ngOnInit(): void {
  }

}
