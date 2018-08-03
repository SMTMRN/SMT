import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AccountManagementProvider } from '../../../services/account-management/account-management-service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recoverPsdValidator: any;

  constructor(private formBuilder: FormBuilder, private accountServices: AccountManagementProvider) {

  }

  ngOnInit() {
    this.doValidations();
  }

  doValidations() {
    this.recoverPsdValidator = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')
      ]))
    });
  }

  // tslint:disable-next-line:member-ordering
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required*' },
      { type: 'pattern', message: 'Enter a valid email' }
    ]
  };

  submitEmail(value) {
    const payload = {
      'username': String(value.email)
    };
    this.accountServices.recoverPassword(payload).subscribe(res => {
      if (res) {
        alert(res.status);
      }
    });
  }

}
