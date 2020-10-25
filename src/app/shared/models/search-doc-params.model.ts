export class SearchDocParams {
  pageIndex: number;
  pageSize: number;

  ids: string[] = [];
  searchedText: string[] = [];
  states: string[] = [];
  languages: string[] = [];
  tags: string[] = [];

  textRegex: string = null;

  createdFrom: Date = null;
  createdTo: Date = null;
  updatedFrom: Date = null;
  updatedTo: Date = null;

  isShared = null;

}
