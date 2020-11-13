import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchDocParams} from '../../shared/models/search-doc-params.model';
import {Subscription} from 'rxjs';
import {DocumentService} from '../document.service';
import {Page} from '../../shared/models/page.model';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss']
})
export class DocumentSearchComponent implements OnInit, OnDestroy {

  @ViewChild('selectedId', {static: false}) selectedId: ElementRef;
  @ViewChild('selectedText', {static: false}) selectedText: ElementRef;
  @ViewChild('selectedTag', {static: false}) selectedTag: ElementRef;

  newDataSub: Subscription;

  searchDocParams: SearchDocParams;

  @Input() pageSize: number;

  searchOptionDropDown = 'Search options';

  clickedSearchOption: string = null;

  searchOptions = ['Id', 'Text', 'State', 'Language', 'Text-Regex',
    'Created date', 'Updated dates', 'Shared', 'Tag'];

  languages = [];

  docStates = [];

  isSearching = false;
  isResetting = false;

  showAdditionalSettings = false;

  searchTags = [];
  writtenId: any;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.searchDocParams = new SearchDocParams();

    this.documentService.languagesMap.forEach((value, key) => {
      this.languages.push(value);
    });

    this.docStates = this.documentService.docStatesList;

    this.newDataSub = this.documentService.newDataReceivedSubject.subscribe((value: Page) => {

      this.isSearching = false;
      this.isResetting = false;

    });
  }

  ngOnDestroy(): void {
    this.newDataSub.unsubscribe();
  }

  onSearchOptionSelect(option: string) {
    console.log('Selected option:' + option);
    this.clickedSearchOption = option;
    this.searchOptionDropDown = option;
  }

  onAddClick(event: Event) {
    if (this.clickedSearchOption == null) {
      return;
    }

    let providedValue;
    if (this.clickedSearchOption !== this.searchOptions[5] && this.clickedSearchOption !== this.searchOptions[6]) {
      providedValue = (document.getElementById(this.clickedSearchOption) as HTMLInputElement).value;
    }


    switch (this.clickedSearchOption) {
      case this.searchOptions[0]:
        if (this.searchDocParams.ids.indexOf(providedValue) === -1) {
          this.searchDocParams.ids.push(providedValue);
          this.selectedId.nativeElement.value = '';
        }
        break;
      case  this.searchOptions[1]:
        if (this.searchDocParams.searchedText.indexOf(providedValue) === -1) {
          this.searchDocParams.searchedText.push(providedValue);
          this.selectedText.nativeElement.value = '';
        }
        break;
      case this.searchOptions[2]:
        if (this.searchDocParams.states.indexOf(providedValue) === -1) {
          this.searchDocParams.states.push(providedValue);
        }
        break;
      case this.searchOptions[3]:
        if (this.searchDocParams.languages.indexOf(providedValue) === -1) {
          this.searchDocParams.languages.push(providedValue);
        }
        break;
      case this.searchOptions[4]:
        this.searchDocParams.textRegex = providedValue;
        break;
      case this.searchOptions[5]:
        // this.searchDocParams.createdFrom = ;
        // this.searchDocParams.createdTo = ;
        console.log('Create date: ', this.searchDocParams.createdFrom, this.searchDocParams.createdTo);
        break;
      case this.searchOptions[6]:
        // this.searchDocParams.createdFrom = ;
        // this.searchDocParams.createdTo = ;
        console.log('Create date: ', this.searchDocParams.updatedFrom, this.searchDocParams.updatedTo);
        break;
      case  this.searchOptions[8]:
        if (this.searchDocParams.tags.indexOf(providedValue) === -1) {
          this.searchDocParams.tags.push(providedValue);
          this.selectedTag.nativeElement.value = '';
        }
        break;
      default:
        console.log('dis shoyld happend');
    }

    console.log('finished');
  }

  onSearchClick() {
    console.log('OnSearchClicked!!!');
    this.searchDocParams.pageSize = this.pageSize;
    this.searchDocParams.pageIndex = 0;
    this.documentService.fetchDocuments(this.searchDocParams);
    this.isSearching = true;
  }

  onResetClick() {
    this.clickedSearchOption = null;
    this.searchOptionDropDown = 'Search options';
    this.searchTags = [];
    this.searchDocParams = new SearchDocParams();
    this.documentService.fetchDocuments(this.searchDocParams);
    this.isSearching = true;
    this.isResetting = true;
  }

  removeItemFromIds(index: number) {
    if (index >= 0) {
      this.searchDocParams.ids.splice(index, 1);
    }
  }

  removeItemFromText(index: number) {
    if (index >= 0) {
      this.searchDocParams.searchedText.splice(index, 1);
    }
  }

  removeItemFromTag(index: number) {
    if (index >= 0) {
      this.searchDocParams.tags.splice(index, 1);
    }
  }

  removeItemFromStates(index: number) {
    if (index >= 0) {
      this.searchDocParams.states.splice(index, 1);
    }
  }

  removeItemFromLanguages(index: number) {
    if (index >= 0) {
      this.searchDocParams.languages.splice(index, 1);
    }
  }

  selectedCreatedDateFrom($event: Date) {
    console.log('Called', event);
    this.searchDocParams.createdFrom = $event;
  }

  selectedCreatedDateTo($event: Date) {
    this.searchDocParams.createdTo = $event;
  }

  selectedUpdatedDateFrom($event: Date) {
    this.searchDocParams.updatedFrom = $event;
  }

  selectedUpdatedDateTo($event: Date) {
    this.searchDocParams.updatedTo = $event;
  }

  onCollapseClick() {
    this.showAdditionalSettings = !this.showAdditionalSettings;
  }

  resetAdditionalSetting(regex: string) {
    console.log('Reseting: ' + regex);
    switch (regex) {
      case 'regex':
        this.searchDocParams.textRegex = null;
        break;
      case 'createFrom':
        this.searchDocParams.createdFrom = null;
        break;
      case 'createTo':
        this.searchDocParams.createdTo = null;
        break;
      case 'updateFrom':
        this.searchDocParams.updatedFrom = null;
        break;
      case 'updateTo':
        this.searchDocParams.updatedTo = null;
        break;
      default:
        break;
    }
  }

  selectedIsShared(event: Event) {

  }
}
