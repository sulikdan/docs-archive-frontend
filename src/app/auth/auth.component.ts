import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
    // this.isLoginMode = !this.authService.isLogged;

    // this.loggedSub = this.authService.loggedSub.subscribe(
    //   value => {
    //     this.isLoginMode = !value;
    //   }
    // );
  }

}
