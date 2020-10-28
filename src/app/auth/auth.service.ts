import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export class User {
  constructor(
    public status: string,
  ) {
  }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  private readonly serverUrl: string;
  private readonly userUrl = '/api/users';

  public isLogged = false;
  public loggedSub = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {
    console.log('Current enviroment: ' + environment.production);
    console.log('Server :' + environment.backend.address);
    this.serverUrl = 'http://' + environment.backend.address + ':' + environment.backend.port;
  }

  login(username: string, password: string) {
    if (username === 'admin@admin.com' && password === 'admin') {
      this.isLogged = true;
      this.loggedSub.next(true);
      // this.user.next('admin');
    } else {
      return this.authenticate(username, password);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    // localStorage.removeItem('userData');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('jwtToken');
    // if (this.tokenExpirationTimer) {
    //   clearTimeout(this.tokenExpirationTimer);
    // }
    // this.tokenExpirationTimer = null;

    this.isLogged = false;
    this.loggedSub.next(false);
  }

  authenticate(username, password) {
    return this.httpClient.post<any>(this.serverUrl + this.userUrl + '/authenticate', {username, password}).pipe(
      catchError(this.handleError),
      map(
        userData => {
          sessionStorage.setItem('username', username);
          console.log('Tokens:', userData.jwtToken, ' ', userData.token);
          const tokenStr = 'Bearer ' + userData.jwtToken;
          // const tokenStr = userData.jwtToken;
          console.log('Token value:', tokenStr);
          if (userData.jwtToken !== undefined) {
            sessionStorage.setItem('jwtToken', tokenStr);
          }
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }


  register(username: string, email: string, password: string) {
    return this.httpClient.post<any>(this.serverUrl + this.userUrl + '/register', {username, email, password});
  }

  registerConfirm(token: string) {
    // const data = {token: JSON.stringify(token)};
    const data = {token};

    return this.httpClient.post(this.serverUrl + this.userUrl + '/register/confirm', {}, {params: data});
  }

  resetAccount(email: string) {
    return this.httpClient.post<any>(this.serverUrl + this.userUrl + '/resetAccount', {email});
  }

  changePassword(currentResetToken: string, password: string) {
    return this.httpClient.post<any>(this.serverUrl + this.userUrl + '/resetAccount/' + currentResetToken, {password});
  }
}
