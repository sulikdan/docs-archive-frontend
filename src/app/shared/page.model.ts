import {Document} from './document.model';
import {Pageable} from './pageable.model';

export class Page {
  public content: Document[];
  public pageable: Pageable;

  public totalElements: number;
  public totalPages: number;
  public size: number;
  public number: number;

  public numberOfElements: number;
  public first: boolean;
  public last: boolean;
  public empty: boolean;


  constructor() {
    this.content = []
    this.totalElements = 0;
    // this.totalPages = totalPages;
    this.size = 0;
    this.number = 0;
    this.numberOfElements = 0;
    this.first = false;
    this.last = false;
    this.empty = false;
  }
}
