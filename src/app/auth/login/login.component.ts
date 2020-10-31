import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isProcessing: boolean = false;
  inputUsername: any;
  inputPassword: any;

  confirmRegToken: string;

  constructor(private authService: AuthService, private router: Router,
              private messageService: MessageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isProcessing = false;


    const loginUrl = this.router.url.split('/').pop();

    if (loginUrl.slice(0, 5) === 'login') {
      console.log('Its login!');
      const token = this.router.parseUrl(this.router.url).queryParams.token;
      if (token !== undefined) {
        console.log('Token:' + token);

        this.authService.registerConfirm(token).subscribe(
          value => {
            console.log('Completed registration!');
            this.messageService.success('You have activated your new account!', 10 * 1000);
          },
          error => {
            console.log('Error while completing registration.');
            this.messageService.success('Error while completing registration.', 10 * 1000);
          }
        );

        this.router.navigate([], {});
      }
    }

  }

  onSubmit(authForm: NgForm) {

    console.log(this.confirmRegToken);

    if (!authForm.valid) {
      return;
    }
    this.isProcessing = true;

    const username = authForm.value.inputUsername;
    const password = authForm.value.inputPassword;

    console.log('Send data: ', username, password);


    this.authService.login(username, password).subscribe(value => {
        console.log('Return value', JSON.stringify(value));
      },
      error => {
        console.log('Error while logging', JSON.stringify(error));
        this.authService.isLogged = false;
        this.authService.loggedSub.next(false);
        this.isProcessing = false;
        // this.authService.authenticateLocal(username, password).subscribe(value => {
        //
        //   },
        //   error2 => {
        //     console.log('Error while logging', JSON.stringify(error2));
        //     this.authService.isLogged = false;
        //     this.authService.loggedSub.next(false);
        //     this.isProcessing = false;
        //   },
        //   () => {
        //     this.isProcessing = false;
        //     this.authService.isLogged = true;
        //     this.authService.loggedSub.next(true);
        //     this.router.navigate(['/home']);
        //   }
        // );

      },
      () => {
        this.isProcessing = false;
        this.authService.isLogged = true;
        this.authService.loggedSub.next(true);
        this.router.navigate(['/home']);

      }
    );
  }


}
