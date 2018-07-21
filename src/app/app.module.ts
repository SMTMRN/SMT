import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/header-footer-section/footer/footer.component';
import { HeaderComponent } from './components/header-footer-section/header/header.component';
import { HomeComponent } from './components/home-section/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountManagementModule } from './components/account-management/account-management.module';
import { Api } from './services/api-settings/api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccountManagementModule
  ],
  providers: [
    Api
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
