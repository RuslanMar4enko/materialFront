import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {Products} from '../../model/products';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Array<Products>;
  public hostUrl = environment.hostUrl;

  constructor(private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.getProducts();
    this.createCartUser();
  }


  getProducts() {
    this.productService.getAllProduct().subscribe(response => {
      this.products = response.data;
    });
  }

  createCartUser() {
    if (!localStorage.getItem('cartKey')) {
      this.cartService.createCart().subscribe(response => {
        if (response.data.key) {
          localStorage.setItem('cartKey', response.data.key);
        }
      });
    }
  }

}
