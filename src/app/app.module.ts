import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthComponent} from './auth/auth.component';
import {DocumentsComponent} from './documents/documents.component';
import {ImportDocumentsComponent} from './import-documents/import-documents.component';
import {ImportComponent} from './import/import.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AsyncApiInfoComponent} from './documents/async-api-info/async-api-info.component';
import {DocConfigComponent} from './documents/doc-config/doc-config.component';
import {PagesComponent} from './documents/pages/pages.component';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StringToDatePipe} from './documents/string-to-date.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {DocumentSearchComponent} from './documents/document-search/document-search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePickerPopupComponent} from './documents/document-search/date-picker-popup/date-picker-popup.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DocumentEditComponent} from './documents/document-edit/document-edit.component';
import {DocExtendedViewComponent} from './documents/doc-extended-view/doc-extended-view.component';
import { MessageComponent } from './shared/components/message/message.component';
import {MessageService} from './shared/services/message.service';
import {FileUploadService} from './import-documents/file-upload.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    DocumentsComponent,
    ImportDocumentsComponent,
    ImportComponent,
    HomeComponent,
    AsyncApiInfoComponent,
    DocConfigComponent,
    PagesComponent,
    StringToDatePipe,
    DocumentSearchComponent,
    DatePickerPopupComponent,
    DocumentEditComponent,
    DocExtendedViewComponent,
    MessageComponent
  ],
  exports:[
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [
    Document,
    MessageService,
    FileUploadService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
