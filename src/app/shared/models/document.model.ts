import {DocPage} from './doc-page.model';
import {AsyncApiInfo} from './async-api-info.model';
import {DocConfig} from './doc-config.model';

export class Document {
  public id: string;
  public origName: string;

  public documentPreview: string;

  public docType: string;
  public createDateTime: Date;
  public updateDateTime: Date;
  public asyncApiInfo: AsyncApiInfo;
  public docState: string;
  public docConfig: DocConfig;

  public tags: string[];

  public pages: DocPage[];

  public isShared: boolean;
  public isOwner: boolean;

  // TODO specify object type
  // public thumbnail: any;
  public fileUrl: string;

}
