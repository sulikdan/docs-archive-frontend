import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MessageService} from '../../shared/services/message.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  inputEmail: any;

  constructor(private authService: AuthService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.inputEmail;

    if (email === undefined || email.length < 6) {
      return;
    }

    this.authService.resetAccount(email).subscribe(
      value => {
        this.messageService.info('We\'ve send you reset link for the account to your mail.');
      },
      error => {
        this.messageService.warning('Provided e-mail is not associated to any acccount.\n', error.message);
      },
      () => {
        console.log('Finished??');
      }
    );

  }
}
