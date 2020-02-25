import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Products} from '../../model/products';
import {Smart} from '../../model/smart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  saveProduct(product): Observable<Products> {
    return this.http.post<Products>('products', product);
  }

  getAllProduct(): Observable<Smart> {
    return this.http.get<Smart>('products');
  }
}
