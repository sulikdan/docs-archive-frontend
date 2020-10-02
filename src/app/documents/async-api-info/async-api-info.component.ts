import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../../shared/models/document.model';

@Component({
  selector: 'app-async-api-info',
  templateUrl: './async-api-info.component.html',
  styleUrls: ['./async-api-info.component.scss']
})
export class AsyncApiInfoComponent implements OnInit {

  @Input() row: Document;


  constructor() { }

  ngOnInit(): void {
  }

}
