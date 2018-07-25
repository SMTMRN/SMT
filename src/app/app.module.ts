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
import { SampleData } from '../assets/mocks/sample-data';
import { ViewCartComponent } from './components/cart-section/view-cart/view-cart.component';
import { ResponseHandler } from './services/api-settings/response-handler';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ViewItemDetailsComponent } from './components/cart-section/view-item-details/view-item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ViewCartComponent,
    ViewItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccountManagementModule
  ],
  providers: [
    Api,
    ResponseHandler,
    SampleData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
