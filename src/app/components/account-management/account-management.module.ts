import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { AccountManagementProvider } from '../../services/account-management/account-management-service';

@NgModule({
  declarations: [
    LoginComponent,
    RecoverPasswordComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountManagementProvider
  ]
})
export class AccountManagementModule { }
