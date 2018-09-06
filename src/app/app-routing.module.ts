import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home-section/home/home.component';
import { LoginComponent } from './components/account-management/login/login.component';
import { RegistrationComponent } from './components/account-management/registration/registration.component';
import { RecoverPasswordComponent } from './components/account-management/recover-password/recover-password.component';
import { ViewCartComponent } from './components/cart-section/view-cart/view-cart.component';
import { ViewItemDetailsComponent } from './components/cart-section/view-item-details/view-item-details.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PlaceOrderComponent } from './components/cart-section/place-order-section/place-order/place-order.component';
import { PaymentOptionsComponent } from './components/cart-section/place-order-section/payment-options/payment-options.component';
import { OrderSummaryComponent } from './components/cart-section/place-order-section/order-summary/order-summary.component';
import { OrderLoginComponent } from './components/cart-section/place-order-section/order-login/order-login.component';
import { DeliveryAddressComponent } from './components/cart-section/place-order-section/delivery-address/delivery-address.component';
import { CouponsComponent } from './components/home-section/coupons/coupons.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FavouriteComponent } from './components/favourite-compare-section/favourite/favourite.component';
import { CompareItemsComponent } from './components/favourite-compare-section/compare-items/compare-items.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgotpassword', component: RecoverPasswordComponent },
  { path: 'view-cart', component: ViewCartComponent },
  { path: 'view-details/:product_name', component: ViewItemDetailsComponent },
  { path: 'library', component: ToolsComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'compare-items', component: CompareItemsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
