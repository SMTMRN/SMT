import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/header-footer-section/footer/footer.component';
import { HeaderComponent } from './components/header-footer-section/header/header.component';
import { HomeComponent } from './components/home-section/home/home.component';
import { AccountManagementModule } from './components/account-management/account-management.module';
import { AccountManagementProvider } from './services/account-management/account-management-service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountManagementModule
  ],
  providers: [
    AccountManagementProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
