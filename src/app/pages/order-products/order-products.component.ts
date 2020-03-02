import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit, OnDestroy {
  private shopId;
  private orderId;
  private sub: any;
  public hostUrl = environment.hostUrl;
  public orderProducts: any;
  private quantityInput: Subject<any> = new Subject();

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.chanQuantity();
    this.route.params.subscribe(params => {
      this.orderId = params.orderId;
      this.shopId = params.shopId;
      this.getOrderProduct();
    });
  }

  chanQuantity() {
    this.sub = this.quantityInput.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(value => {
        this.orderService.changeQuantity(value.id, value.quantity).subscribe(() => {
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getOrderProduct() {
    const {orderId, shopId} = this;
    this.orderService.getOrderProduct(orderId, shopId).subscribe(response => {
      this.orderProducts = response.data;
    });
  }

  public changeQuantity(quantity, id) {
    this.quantityInput.next({quantity, id});
  }
  public removeOrderItemAll(id) {
    this.orderService.removeOrderItemAll(id).subscribe(response => {
      if (response.status) {
        const item = this.orderProducts.findIndex(c => c.pivot.id === id);
        this.orderProducts.splice(item, 1);
      }
    });
  }
  public getTotalPrice(orderProduct): number {
    return orderProduct.totalPrice = orderProduct.pivot.quantity * orderProduct.price;
  }
}
