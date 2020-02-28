import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Order} from '../../model/order';
import {ModalOrderComponent} from '../modal-order/modal-order.component';
import {Field} from '../../model/field';
import fields from './field';
import {OrderService} from '../../services/order/order.service';
import {Cart} from '../../model/cart';
import {CartService} from '../../services/cart/cart.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public order = new Order();
  public fields: Array<Field>;
  public sub: any;
  @Input() products: Array<Cart>;
  @Output() clearCart: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog,
              private orderService: OrderService,
              private cartService: CartService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.fields = fields;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      order: this.order,
      fields: this.fields,
      title: 'Create order'
    };
    const dialogRef = this.dialog.open(ModalOrderComponent, dialogConfig);

    this.sub = dialogRef.afterClosed().subscribe(result => {
      const productOrder = this.dataFromOrder(result);
      this.saveOrder(productOrder);
    });
  }

  private saveOrder(product) {
    this.orderService.saveOrder(product).subscribe(response => {
      if (response.data) {
        this.removeCartItems();
      }
    });
  }

  private removeCartItems() {
    this.cartService.removeCartItemAll().subscribe(response => {
      if (response.status) {
        this.clearCart.emit();
        this.toasterService
          .pop('success', 'Success', 'Order Created');
      }
    });
  }

  private dataFromOrder(result) {
    const productOrder = result;
    productOrder.data = [];
    for (const product of  this.products) {
      productOrder.data[product.id] = [];
      productOrder.data[product.id] = {
        shop_id: product.shop_id,
        quantity: product.pivot.quantity,
        price: product.price,
        total_price: product.totalPrice
      };
    }

    return productOrder;
  }

}
