import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AccountManagementProvider } from '../../../services/account-management/account-management-service';
import { RegistrationValidator } from '../../../services/account-management/validators/registration-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationValidator: any;
  passwordFormGroup: any;

  constructor(private formBuilder: FormBuilder, private accountServices: AccountManagementProvider) {

  }

  ngOnInit() {
    this.doValidations();
  }

  doValidations() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });

    this.registrationValidator = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      GSTnumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')
      ])),
      passwordFormGroup: this.passwordFormGroup
    });
  }

  // tslint:disable-next-line:member-ordering
  validation_messages = {
    'firstName': [
      { type: 'required', message: 'Firstname is required*' }
    ],
    'lastName': [
      { type: 'required', message: 'Lastname is required*' }
    ],
    'mobileNumber': [
      { type: 'required', message: 'Mobile number is required*' }
    ],
    'GSTnumber': [
      { type: 'required', message: 'GST number is required*' }
    ],
    'email': [
      { type: 'required', message: 'Email is required*' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required*' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required*' }
    ]
  };

  submitRegistration(values) {
    console.log(values);
    const payload = {
      'firstname': values.firstName,
      'lastname': values.lastName,
      'mobile': String(values.mobileNumber),
      'email': values.email,
      'password': values.password,
      'confirm_password': values.confirmPassword,
      'newsletter': '',
      'gstnumber': String(values.GSTnumber),
      'user_type': ''
    };

    this.accountServices.registration(payload).subscribe(res => {
      if (res) {

      }
    });

  }

}
