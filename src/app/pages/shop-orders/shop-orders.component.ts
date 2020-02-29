import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {ActivatedRoute} from '@angular/router';
import {Orders} from '../../model/orders';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.scss']
})
export class ShopOrdersComponent implements OnInit {
  public sub: any;
  public orders: Array<Orders>;
  private shopId;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.shopId = params.id;
      this.getOrder();
    });
  }

  public getOrder() {
    this.orderService.getShopOrders(this.shopId).subscribe(response => {
      if (response.data) {
        this.orders = response.data;
      }
    });
  }

  public deleteOrder(id) {
    this.orderService.deleteOrder(id).subscribe(response => {

    })
  }

}
