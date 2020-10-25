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
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      this.currentResetToken = urlPath[urlPath.length - 1].path;
    });
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
        this.messageService.error('The password was not reset!\n' + error.ge());
      }
    );

  }
}
