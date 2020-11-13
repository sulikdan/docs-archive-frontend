import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

/**
 * Interceptor to add JwtToken inside communication with server.
 */
@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isLogged) {

      req = req.clone({
        setHeaders: {
          // Authorization: sessionStorage.getItem('jwtToken'),
          Authorization: sessionStorage.getItem('jwtToken')
        }
      });
      console.log('Is logged...', req.headers);
    }

    return next.handle(req);

  }
}
