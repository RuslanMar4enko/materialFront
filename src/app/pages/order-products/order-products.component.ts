import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit, OnDestroy {
  private shopId;
  private orderId;
  private sub: any;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = params.orderId;
      this.shopId = params.shopId;
      this.getOrderProduct();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getOrderProduct() {
    const {orderId, shopId} = this;
    this.orderService.getOrderProduct(orderId, shopId).subscribe(response => {
      console.log(response);
    });
  }

}
