import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {LoginComponent} from './pages/login/login.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/interceptor/token.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ToasterModule} from 'angular2-toaster';
import { CreateProductsComponent } from './pages/create-products/create-products.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ShopProductComponent } from './pages/shop-product/shop-product.component';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material';
import { SmartFormComponent } from './components/smart-form/smart-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    CreateProductsComponent,
    ShopsComponent,
    ShopProductComponent,
    SmartFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
