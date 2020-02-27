import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Smart} from '../../model/smart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }


  public createCart(): Observable<any> {
    // TODO uid send
    return this.http.post<any>('carts', '');
  }

  public addToCart(id): Observable<any> {
    const payload = {
      cartKey: localStorage.getItem('cartKey'),
      productId: id
    };
    return this.http.post<any>('carts/item', payload);
  }

  public getProductItem(cartId): Observable<Smart> {
    return this.http.get<Smart>('cart/' + cartId);
  }

  public importProductToCart(cartId, file): Observable<any> {
    return this.http.post<any>('cart/import/' + cartId, file);
  }

  public removeCartItem(id): Observable<any> {
    return this.http.delete<any>('cart/' + id);
  }

  public changeQuantity(id, quantity): Observable<any> {
    return this.http.put<any>('cart/' + id, {quantity});
  }
}


