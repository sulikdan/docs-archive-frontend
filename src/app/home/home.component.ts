import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  isLogged: boolean;
  loggedSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    this.isLogged = this.authService.isLogged;

    this.loggedSub = this.authService.loggedSub.subscribe(
      (logged: boolean) => {
        this.isLogged = logged;
      }
    );

  }

  ngOnDestroy() {
    this.loggedSub.unsubscribe();
  }

}
