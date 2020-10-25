import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       params: new HttpParams().set('Authorization', user.token)
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );

    // if (sessionStorage.getItem('username') && sessionStorage.getItem('jwtToken')) {
    //   const insideJwtToken = sessionStorage.getItem('jwtToken');
    //   // if (insideJwtToken.indexOf('undefined') === -1) {
    //     console.log('Caleed insed!!!', insideJwtToken);
    //     req = req.clone({
    //       setHeaders: {
    //         // Authorization: sessionStorage.getItem('jwtToken'),
    //         Authorization: sessionStorage.getItem('jwtToken')
    //       }
    //     });
    //     console.log('I was inside intercept');
    //   // }
    //
    // }
    //
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
