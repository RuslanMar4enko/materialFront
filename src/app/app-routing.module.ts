import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ShopsComponent} from './pages/shops/shops.component';
import {AuthGuardService} from './services/login/auth-guard.service';
import {ShopProductComponent} from './pages/shop-product/shop-product.component';
import {CreateProductsComponent} from './pages/create-products/create-products.component';
import {CartComponent} from './pages/cart/cart.component';
import {ShopOrdersComponent} from './pages/shop-orders/shop-orders.component';
import {OrderProductsComponent} from './pages/order-products/order-products.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shops', component: ShopsComponent, canActivate: [AuthGuardService]},
  {path: 'shops-order/:id', component: ShopOrdersComponent, canActivate: [AuthGuardService]},
  {path: 'shops-product/:id', component: ShopProductComponent, canActivate: [AuthGuardService]},
  {path: 'create-product/:id', component: CreateProductsComponent, canActivate: [AuthGuardService]},
  {path: 'order-products/:orderId/:shopId', component: OrderProductsComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
