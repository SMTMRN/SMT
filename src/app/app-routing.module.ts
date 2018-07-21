import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home-section/home/home.component';
import { LoginComponent } from './components/account-management/login/login.component';
import { RegistrationComponent } from './components/account-management/registration/registration.component';
import { RecoverPasswordComponent } from './components/account-management/recover-password/recover-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgotpassword', component: RecoverPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
