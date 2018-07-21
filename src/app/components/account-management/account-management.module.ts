import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoverPasswordComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class AccountManagementModule { }
