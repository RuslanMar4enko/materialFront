import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {Cart} from '../../model/cart';
import {environment} from '../../../environments/environment';
import {ToasterService} from 'angular2-toaster';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private cartKey = localStorage.getItem('cartKey');
  public cartProducts: Array<Cart> = [];
  public hostUrl = environment.hostUrl;
  public formData: FormData;
  private quantityInput: Subject<any> = new Subject();
  private sub: any;

  constructor(private cartService: CartService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.getProductsCart();
    this.sub = this.quantityInput.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(value => {
        this.cartService.changeQuantity(value.id, value.quantity).subscribe(() => {
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Get product Cart
   */
  private getProductsCart() {
    this.cartService.getProductItem(this.cartKey).subscribe(response => {
      this.cartProducts = response.data;
    });
  }

  /**
   * total Price
   * @param cartProduct
   */
  public getTotalPrice(cartProduct): number {
    return cartProduct.totalPrice = cartProduct.pivot.quantity * cartProduct.price;
  }

  /**
   * Upload Cart  file product id and quantity
   * @param event
   */
  public fileUpload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.type !== 'text/csv') {
      this.toasterService
        .pop('error', 'Error', 'Invalid format file');
      return;
    }
    this.formData = new FormData();
    this.formData.set('file', file);
  }

  /**
   * Send file
   */
  public submitFile() {
    if (!this.formData) {
      this.toasterService
        .pop('error', 'Error', 'Please select valid file "csv"');
      return;
    }
    this.cartService.importProductToCart(this.cartKey, this.formData)
      .subscribe(response => {
        (document.getElementById('file') as HTMLInputElement).value = '';
        this.formData.delete('file');
        if (response.status) {
          this.getProductsCart();
        }
      });
  }

  /**
   * Remove item cart
   * @param id
   */
  public removeCartItem(id) {
    this.cartService.removeCartItem(id).subscribe(response => {
      if (response.status) {
        const item = this.cartProducts.findIndex(c => c.pivot.id === id);
        this.cartProducts.splice(item, 1);
      }
    });
  }

  /**
   * change Quantity cart item
   * @param quantity
   * @param id
   */
  public changeQuantity(quantity, id) {
    this.quantityInput.next({quantity, id});
  }

  /**
   * Clear cart Out
   */
  public clearCartProduct() {
    this.cartProducts = [];
  }
}
