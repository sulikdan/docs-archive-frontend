import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

// export interface AuthResponseData {
//
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged = true;
  public loggedSub = new Subject<boolean>();

  constructor() {
    // this.loggedSub.
  }


  register(email: string, password: string) {
    // http connection etc...
    this.isLogged = true;
    this.loggedSub.next(true);
  }

  login(email: string, password: string) {
    if (email === 'admin@admin.com' && password === 'admin') {
      this.isLogged = true;
      this.loggedSub.next(true);
    } else {
      this.isLogged = false;
      this.loggedSub.next(false);
    }
  }

  logout() {
    this.isLogged = false;
    this.loggedSub.next(false);
  }

}
