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

  public importProductToCart(cartId, file) {
    return this.http.post('/cart/import' + cartId, file);
  }
}


