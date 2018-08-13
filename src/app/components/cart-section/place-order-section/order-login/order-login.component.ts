import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountManagementProvider } from '../../../../services/account-management/account-management-service';
import { GlobalEventManagerService } from '../../../../services/event-manager/global-event-manager.service';

@Component({
  selector: 'app-order-login',
  templateUrl: './order-login.component.html',
  styleUrls: ['./order-login.component.css']
})
export class OrderLoginComponent implements OnInit {

  username: any = "";
  userLoggedIn: boolean;
  ngEmail = '';
  loginValidator: any;
  ngPassword = '';
  @Output() loginDetails = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder, private accountServices: AccountManagementProvider,
    private globalEventsManager: GlobalEventManagerService) {
    this.globalEventsManager.showMainMenuEmitter.subscribe((mode) => {
      if (mode !== null) {
        if (mode) {
          this.userLoggedIn = true;
          console.log("Entering Global");
          // this.onLoginDetailsSubmit(true);
          var userData = JSON.parse(localStorage.getItem('userInfo'));
          if (userData !== null && userData !== undefined && userData !== []) {
            this.username = userData.username;
          }
        }
        else {
          this.userLoggedIn = false;
        }
      }
    });
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
            localStorage.setItem('userInfo', JSON.stringify(res));
            this.globalEventsManager.showMainMenu(true);
            this.onLoginDetailsSubmit(true);
          }
        });
      }
    });
  }

  onLoginDetailsSubmit(story) {
    console.log("Entering Emit");
    this.loginDetails.emit(story);
  }

}
