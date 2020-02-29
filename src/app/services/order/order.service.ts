import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Smart} from '../../model/smart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  saveOrder(payload): Observable<any> {
    return this.http.post<any>('order', payload);
  }

  getShopOrders(id): Observable<Smart> {
    return this.http.get<Smart>('cart/orders/' + id);
  }

  updateOrder(payload): Observable<any> {
    return this.http.put<any>('orders/' + payload.id, payload);
  }

  deleteOrder(id): Observable<any> {
    return this.http.delete<any>('orders/' + id);
  }

  getOrderProduct(orderId, shopId): Observable<any> {
    return this.http.get<any>('orders/' + orderId, {
      params: {
        shopId
      }
    });
  }

  changeQuantity(id, quantity): Observable<any> {
    return this.http.put<any>('order/product/' + id, {quantity});
  }

  removeOrderItemAll(id): Observable<any> {
    return this.http.delete<any>('order/product/' + id);
  }

}
