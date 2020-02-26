import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {Cart} from '../../model/cart';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private cartKey = localStorage.getItem('cartKey');
  public cartProducts: Array<Cart>;
  public hostUrl = environment.hostUrl;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.getProductsCart();
  }

  private getProductsCart() {
    this.cartService.getProductItem(this.cartKey).subscribe(response => {
      this.cartProducts = response.data;
      console.log(this.cartProducts);
    });
  }

  public getTotalPrice(cartProduct) {
    return cartProduct.pivot.quantity * cartProduct.price;
  }

}
