import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authSub: Subscription;

  // private userSub: Subscription;

  constructor(
    // private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isLogged;

    this.authSub = this.authService.loggedSub.subscribe(
      value => {
        this.isAuthenticated = value;
      }
    );
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    //   console.log(!user);
    //   console.log(!!user);
    // });
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  onLogin() {

  }

  onRegister() {

  }
}
