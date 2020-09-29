import {DocPage} from './doc-page.model';
import {AsyncApiInfo} from './async-api-info.model';
import {DocConfig} from './doc-config.model';

export class Document {
  public id: string;
  public origName: string;
  // public path: string;
//  todo Byte[]
//  todo byte[]
  public docType: string;
  public createDateTime: Date;
  public updateDateTime: Date;
  public asyncApiInfo: AsyncApiInfo; // TODO not needed
  public docState: string;
  public docConfig: DocConfig;

  public tags: string[]; // TODO add

  public pages: DocPage[];
}
