import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {MessageService} from '../../../shared/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  inputPassword: any;
  inputCheckPassword: any;
  wrongPassword: boolean;
  currentResetToken: string;

  constructor(private authService: AuthService, private messageService: MessageService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // this.activatedRoute.parent.url.subscribe((urlPath) => {
    //   this.currentResetToken = urlPath[urlPath.length - 1].path;
    //   console.log('Reset token:', this.currentResetToken);
    // });
    console.log('Inside change password!!');


    const loginUrl = this.router.url.split('/').pop();
    console.log('Inside change password!!');
    // console.log('Its login comp. with :' + this.router.url);

    if (loginUrl.slice(0, 8) === 'password') {
      console.log('Its password reset!');
      const token = this.router.parseUrl(this.router.url).queryParams.token;
      this.currentResetToken = token;
      // if (token !== undefined) {
      //   console.log('Token:' + token);
      //
      //   this.authService.changePassword(token).subscribe(
      //     value => {
      //       console.log('Completed registration!');
      //       this.messageService.success('You have activated your new account!', 10 * 1000);
      //     },
      //     error => {
      //       console.log('Error while completing registration.');
      //       this.messageService.success('Error while completing registration.', 10 * 1000);
      //     }
      //   );
      //
      //   this.router.navigate([], {});
      // }
    }

  }

  onReset(authForm: NgForm) {
    const password = authForm.value.inputPassword;
    const retryPass = authForm.value.inputCheckPassword;

    console.log('Account reset:', password, retryPass);

    if (password !== retryPass) {
      this.wrongPassword = true;
      return;
    } else {
      this.wrongPassword = false;
    }

    // const url = this.activatedRoute.parent.url;
    // const resetToken = this.activatedRoute.parent.url;
    // const resetToken = url.split('/').pop();
    // const resetToken = url.split('/').pop();

    this.authService.changePassword(this.currentResetToken, password).subscribe(
      value => {
        console.log('Return value: ' + value.toString());
        this.messageService.info('The password was reset!', 5);
        this.router.navigate(['../../login']);
      },
      error => {
        console.log('Return value: ' + error.toString());
        this.messageService.error('The password was not reset!\n' + error.error);
      },
      () => {
        console.log('Completed new password!');
      }
    );

  }
}
