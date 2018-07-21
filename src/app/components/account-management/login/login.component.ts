import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AccountManagementProvider } from '../../../services/account-management/account-management-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngEmail = '';
  loginValidator: any;
  ngPassword = '';
  constructor(private formBuilder: FormBuilder, private accountServices: AccountManagementProvider) {

  }

  ngOnInit() {
    this.doValidations();
  }

  doValidations() {
    this.loginValidator = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required),
    });
  }

  // tslint:disable-next-line:member-ordering
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required*' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required*' }
    ]
  };

  loginUser() {
    const payload = {
      'email': String(this.ngEmail),
      'password': String(this.ngPassword)
    };
    this.accountServices.login(payload).subscribe(res => {
      if (res) {

      }
    });
  }

}
