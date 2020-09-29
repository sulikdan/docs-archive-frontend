import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode;
  isLoading = false;
  error: string = null;

  loggedSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoginMode = !this.authService.isLogged;

    this.loggedSub = this.authService.loggedSub.subscribe(
      value => {
        this.isLoginMode = !value;
      }
    );
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    this.authService.login(email, password);

    // TODO subscribe
    if (this.authService.isLogged) {
      this.router.navigate(['/home']);
    }

    // let authObs: Observable<AuthResponseData>;
    //
    // this.isLoading = true;
    //
    // if (this.isLoginMode) {
    //   authObs = this.authService.login(email, password);
    // } else {
    //   authObs = this.authService.signup(email, password);
    // }
    //
    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    authForm.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy() {
    this.loggedSub.unsubscribe();
  }

}
