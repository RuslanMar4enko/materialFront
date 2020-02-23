import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Smart} from '../../model/smart';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http: HttpClient) {
  }

  shops(): Observable<Smart> {
    return this.http.get<Smart>('shops');
  }

  getShopProduct(id): Observable<Smart> {
    return this.http.get<Smart>('shops/' + id);
  }
}
