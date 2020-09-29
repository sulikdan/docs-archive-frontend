import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DocumentsComponent} from './documents/documents.component';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {ImportComponent} from './import/import.component';
import {ImportDocumentsComponent} from './import-documents/import-documents.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'import', component: ImportDocumentsComponent},
  {path: 'auth', component: AuthComponent}
  // ,
  // {path: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
