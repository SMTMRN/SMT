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
      'ip_address': '',
      'user_type': 'web'
    };
    let authorization = '';
    const userDetails = String(this.ngEmail) + ':' + String(this.ngPassword);
    this.accountServices.getIp().subscribe(data => {
      if (data) {
        authorization = btoa(userDetails);
        payload.ip_address = String(data.ip);
        this.accountServices.login(payload, authorization).subscribe(res => {
          if (res) {
            console.log(res);
            alert('Welcome - ' + res.username);
          }
        });
      }
    });
  }
  // email::::::::::sindhu.seelapureddy@gmail.com
  // password:::::::sindhu
}
