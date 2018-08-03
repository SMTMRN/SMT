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
import { CarouselComponent } from './components/home-section/carousel/carousel.component';
import { SmtpInfoComponent } from './components/home-section/smtp-info/smtp-info.component';
import { AddBlockComponent } from './components/home-section/add-block/add-block.component';
import { ToolsCategoryComponent } from './components/home-section/tools-category/tools-category.component';
import { TopBrandsComponent } from './components/home-section/top-brands/top-brands.component';
import { OffersComponent } from './components/home-section/offers/offers.component';
import { OffersAdsComponent } from './components/home-section/offers-ads/offers-ads.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PlaceOrderComponent } from './components/cart-section/place-order-section/place-order/place-order.component';
import { OrderLoginComponent } from './components/cart-section/place-order-section/order-login/order-login.component';
import { DeliveryAddressComponent } from './components/cart-section/place-order-section/delivery-address/delivery-address.component';
import { OrderSummaryComponent } from './components/cart-section/place-order-section/order-summary/order-summary.component';
import { PaymentOptionsComponent } from './components/cart-section/place-order-section/payment-options/payment-options.component';
import { ErrorValidatorComponent } from './components/validators/error-validator/error-validator.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ViewCartComponent,
    ViewItemDetailsComponent,
    CarouselComponent,
    SmtpInfoComponent,
    AddBlockComponent,
    ToolsCategoryComponent,
    TopBrandsComponent,
    OffersComponent,
    OffersAdsComponent,
    ToolsComponent,
    OrderLoginComponent,
    PlaceOrderComponent,
    DeliveryAddressComponent,
    OrderSummaryComponent,
    PaymentOptionsComponent,
    ErrorValidatorComponent
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
