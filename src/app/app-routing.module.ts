import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DocumentsComponent} from './documents/documents.component';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {ImportDocumentsComponent} from './import-documents/import-documents.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {PasswordResetComponent} from './auth/password-reset/password-reset.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
  {path: 'import', component: ImportDocumentsComponent, canActivate: [AuthGuard]},
  {path: 'auth', redirectTo: 'auth/login' },
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'reset', component: PasswordResetComponent, children: [
          {path: 'password', component: PasswordResetComponent}
        ]}
    ]
  }
  // ,
  // {path: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
