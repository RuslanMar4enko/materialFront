import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ShopsComponent} from './pages/shops/shops.component';
import {AuthGuardService} from './services/login/auth-guard.service';
import {ShopProductComponent} from './pages/shop-product/shop-product.component';
import {CreateProductsComponent} from './pages/create-products/create-products.component';
import {CardComponent} from './pages/card/card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shops', component: ShopsComponent, canActivate: [AuthGuardService]},
  {path: 'shops-product/:id', component: ShopProductComponent, canActivate: [AuthGuardService]},
  {path: 'create-product/:id', component: CreateProductsComponent, canActivate: [AuthGuardService]},
  {path: 'card', component: CardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
