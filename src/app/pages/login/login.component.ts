import {Component, OnInit} from '@angular/core';
import {AuthCredential} from '../../model/auth-credential';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../services/validation/validation.service';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public credential: AuthCredential = new AuthCredential();
  private readonly messages = {
    email: {
      required: 'Please insert a email address.',
      email: 'Please enter a valid email address.',
      default: 'text required'
    },
    password: {
      required: 'Password required',
      minlength: 'Password minLength 6',
      default: 'text required',
    }
  };

  public loginForm = new FormGroup({
    email: new FormControl(this.credential.email, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(this.credential.password, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private validService: ValidationService,
              private login: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public error(tagName: string): string {
    return this.validService.validRequired(tagName, this.loginForm);
  }

  public getMessageValid(tagName): string {
    return this.validService.validMessage(tagName, this.loginForm, this.messages);
  }

  public submit() {
    if (!this.loginForm.invalid) {
      this.login.login(this.loginForm.value).subscribe(response => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['shops']);
        }
      });
    }

  }

}
