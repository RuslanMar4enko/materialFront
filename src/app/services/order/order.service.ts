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

  deleteOrder(id): Observable<any> {
    return this.http.delete<any>('orders' + id);
  }

}
