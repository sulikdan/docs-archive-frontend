import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';

@Component({
  selector: 'app-document-tags',
  templateUrl: './document-tags.component.html',
  styleUrls: ['./document-tags.component.scss']
})
export class DocumentTagsComponent implements OnInit {

  @Input() row: Document;

  constructor() {
  }

  ngOnInit(): void {
  }

}
