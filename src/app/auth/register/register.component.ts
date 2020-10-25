import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MessageService} from '../../shared/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  wrongPassword: boolean;
  isProcessing: boolean;
  inputUsername: any;
  inputEmail: any;
  inputPassword: any;
  inputCheckPassword: any;

  constructor(private authService: AuthService, private messageService: MessageService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.wrongPassword = false;
    this.isProcessing = false;
  }

  onSubmit(authForm: NgForm) {
    const username = authForm.value.inputUsername;
    const email = authForm.value.inputEmail;
    const password = authForm.value.inputPassword;
    const retryPass = authForm.value.inputCheckPassword;
    this.isProcessing = true;

    if (!this.isInputValid(username) || !this.isInputValid(email) || !this.isInputValid(password) || !this.isInputValid(retryPass)) {
      // TODO better use reactive checking
      return;
    }

    if (password !== retryPass) {
      this.wrongPassword = true;
      return;
    } else {
      this.wrongPassword = false;
    }

    console.log('date for registration:', username, email, password, retryPass);

    this.authService.register(username, email, password).subscribe(
      value => {
      },
      error => {
        console.log('Error to register.', error.message);
        this.messageService.failure('Fail while trying to register new user.\n' + error.message);
        this.isProcessing = false;
      },
      () => {
        console.log('Finished to register.');
        this.isProcessing = false;
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute});
        this.messageService.info('An confirmation email was sent to your email address. To complete registration, please confirm it.', 5);
      }
    );
  }

  isInputValid(value: string) {
    return value !== undefined && value.length >= 5;
  }
}

