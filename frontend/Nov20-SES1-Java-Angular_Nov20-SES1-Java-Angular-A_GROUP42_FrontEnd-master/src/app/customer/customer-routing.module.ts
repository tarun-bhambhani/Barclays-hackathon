import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EKartRoutingGuard } from '../app.routing-guard';
import { CustomerDetailsComponent } from './customer-home/customer-details/customer-details.component';
import { ViewAllProductsComponent } from './customer-home/view-all-products/view-all-products.component';
import { CustomerCartComponent } from './customer-home/customer-cart/customer-cart.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLandingPageComponent } from './customer-landing-page/customer-landing-page.component';
import { LoginComponent } from './customer-landing-page/login/login.component';
import { RegistrationComponent } from './customer-landing-page/registration/registration.component';
import { CheckoutComponent } from './customer-home/checkout/checkout.component';
import { MyOrdersComponent } from './customer-home/my-orders/my-orders.component';
import { CheckoutAddressComponent } from './customer-home/checkout/checkout-address/checkout-address.component';
import { CheckoutCardComponent } from './customer-home/checkout/checkout-card/checkout-card.component';
import { CheckoutInvoiceComponent } from './customer-home/checkout/checkout-invoice/checkout-invoice.component';
import { CheckoutGuard } from './customer-home/checkout/checkout.guard';


const routes: Routes = [
  { path: 'applicationHome', component: CustomerLandingPageComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationComponent}
  ] },
  { path: 'home', component: CustomerHomeComponent, canActivate: [EKartRoutingGuard], children: [
      { path: '', redirectTo: 'products', pathMatch: 'full'},
      { path: 'details', component: CustomerDetailsComponent },
      { path: 'products', component: ViewAllProductsComponent },
      { path: 'cart', component: CustomerCartComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'checkout', component : CheckoutComponent, canActivate: [CheckoutGuard], children: [
        { path: "", redirectTo: 'address',pathMatch:  'full' },
        { path: 'address', component: CheckoutAddressComponent, canActivate:[CheckoutGuard] },
        { path: 'card', component: CheckoutCardComponent },
        { path: 'invoice', component: CheckoutInvoiceComponent },
      ]},
  ]},
  { path: '', redirectTo: '/applicationHome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }