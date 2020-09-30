import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchDocParams} from '../../shared/search-doc-params.model';
import {Subscription} from 'rxjs';
import {DocumentService} from '../document.service';
import {Page} from '../../shared/page.model';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss']
})
export class DocumentSearchComponent implements OnInit, OnDestroy {

  newDataSub: Subscription;

  searchDocParams: SearchDocParams;

  searchOptionDropDown = 'Search options';

  clickedSearchOption: string = null;

  searchOptions = ['Id', 'Text', 'State', 'Language', 'Text-Regex',
    'Created date', 'Updated dates'];

  languages = [];

  docStates = [];

  isSearching = false;
  isResetting = false;

  searchTags = [];

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.documentService.languagesMap.forEach((value, key) => {
      this.languages.push(value);
    });

    this.docStates = this.documentService.docStatesList;

    this.searchDocParams = new SearchDocParams();
    this.newDataSub = this.documentService.newDataReceivedSubject.subscribe((value: Page) => {

      this.isSearching = false;
      this.isResetting = false;

    });
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
        this.searchDocParams.ids.push(providedValue);
        break;
      case  this.searchOptions[1]:
        this.searchDocParams.searchedText.push(providedValue);
        break;
      case this.searchOptions[2]:
        this.searchDocParams.states.push(providedValue);
        break;
      case this.searchOptions[3]:
        this.searchDocParams.languages.push(providedValue);
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
      default:
        console.log('dis shoyld happend');
    }

    console.log('finished');
  }

  onSearchClick() {
    console.log('OnSearchClicked!!!');
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
    this.searchDocParams.ids.splice(index, 1);
  }

  removeItemFromText(index: number) {
    this.searchDocParams.searchedText.splice(index, 1);
  }

  removeItemFromStates(index: number) {
    this.searchDocParams.states.splice(index, 1);
  }

  removeItemFromLanguages(index: number) {
    this.searchDocParams.languages.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.newDataSub.unsubscribe();
  }

}
