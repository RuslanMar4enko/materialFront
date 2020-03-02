import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs';
import {catchError, finalize, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {LoaderService} from '../loader/loader.service';
import {CartService} from '../cart/cart.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private login: LoginService, private toasterService: ToasterService,
              private router: Router,
              public loaderService: LoaderService,
              private cartService: CartService) {
  }

  private baseUrl = environment.apiUrl;
  private routeWithOutAuth = ['login', 'home', 'cart'];

  private addHeaders(req, url?) {
    let headers = {};
    const authHeaders = {
      Authorization: `Bearer ${this.login.getToken()}`,
    };
    if (!this.routeWithOutAuth.includes(req.url)) {
      headers = {...headers, ...authHeaders};
    }
    return req.clone({
      url: url ? url : `${this.baseUrl}/${req.url}`,
      setHeaders: headers
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addHeaders(request);
    if (!request.params) {
      this.loaderService.show();
    }
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else if (error.error.error === 'The token has been blacklisted' ||
          error.error.message === 'Token has expired and can no longer be refreshed' ||
          error.error.error === 'token_invalid') {
          localStorage.removeItem('access_token');
          this.router.navigate(['login']);
        } else {
          const newKey = this.removeCart(error, request);
          if (!newKey) {
            this.toasterService
              .pop('error', 'Error', error.error.message);
          }
        }
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.login.refreshToken().pipe(
      switchMap(data => {
        if (data) {
          localStorage.setItem('access_token', data.access_token);
          const newRequest = this.addHeaders(request, request.url);
          return next.handle(newRequest);
        }
      })
    );
  }

  private removeCart(error, request) {
    if (request.url.includes('cart') && error.status === 404) {
      localStorage.removeItem('cartKey');
      this.cartService.createCart().subscribe(response => {
        if (response.data.key) {
          localStorage.setItem('cartKey', response.data.key);
          return response.data.key;
        }
      });
    }
  }
}
