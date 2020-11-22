import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DocumentsComponent} from './documents/documents.component';
import {AuthComponent} from './auth/auth.component';
import {ImportDocumentsComponent} from './import-documents/import-documents.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {PasswordResetComponent} from './auth/password-reset/password-reset.component';
import {AuthGuard} from './guards/auth.guard';
import {ChangePasswordComponent} from './auth/password-reset/change-password/change-password.component';
import {PasswordResetContainerComponent} from './auth/password-reset/password-reset-container/password-reset-container.component';


const routes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  // {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
  {path: 'import', component: ImportDocumentsComponent, canActivate: [AuthGuard]},
  {path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'reset', component: PasswordResetContainerComponent, children: [
          {path: 'password', component: ChangePasswordComponent},
          { path: '', component: PasswordResetComponent },
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
