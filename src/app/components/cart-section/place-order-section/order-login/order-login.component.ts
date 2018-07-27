import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountManagementProvider } from '../../../../services/account-management/account-management-service';

@Component({
  selector: 'app-order-login',
  templateUrl: './order-login.component.html',
  styleUrls: ['./order-login.component.css']
})
export class OrderLoginComponent implements OnInit {

  ngEmail = '';
  loginValidator: any;
  ngPassword = '';
  @Output() loginDetails = new EventEmitter<string>();
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
    console.log(payload);
    if (payload.email === 'kag1289@gmail.com') {
      this.onLoginDetailsSubmit(true);
    }
    // this.accountServices.login(payload).subscribe(res => {
    //   if (res) {

    //   }
    // });
  }

  onLoginDetailsSubmit(story) {
    this.loginDetails.emit(story);
  }

}
