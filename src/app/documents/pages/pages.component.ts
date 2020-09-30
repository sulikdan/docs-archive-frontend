import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/document.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  @Input() row: Document;

  constructor() {
  }

  ngOnInit(): void {
  }

}
