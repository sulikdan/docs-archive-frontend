export class SearchDocParams {
  pageIndex: number;
  pageSize: number;

  ids: string[] = [];
  searchedText: string[] = [];
  states: string[] = [];
  languages: string[] = [];
  tags: string[] = [];

  textRegex: string;

  createdFrom: Date;
  createdTo: Date;
  updatedFrom: Date;
  updatedTo: Date;

}
