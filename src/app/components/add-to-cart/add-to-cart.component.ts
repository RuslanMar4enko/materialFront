import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() public productPrice: number;
  @Input() public productId: number;

  constructor(private cartService: CartService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
  }

  public addToCart() {

    this.cartService.addToCart(this.productId).subscribe(response => {
      if (response.data) {
        this.toasterService
          .pop('success', 'Success', 'Product add to cart');
      }
    });
  }

}
