import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {ActivatedRoute} from '@angular/router';
import {Orders} from '../../model/orders';
import {ToasterService} from 'angular2-toaster';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ModalOrderComponent} from '../../components/modal-order/modal-order.component';
import fields from '../../components/order/field';
import {Field} from '../../model/field';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.scss']
})
export class ShopOrdersComponent implements OnInit, OnDestroy {
  public sub: any;
  public orders: Array<Orders>;
  private shopId;
  public fields: Array<Field>;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private toasterService: ToasterService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.shopId = params.id;
      this.fields = fields;
      this.getOrder();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
      if (response.status) {
        const indexOrder = this.getIndexOrder(id);
        this.orders.splice(indexOrder, 1);
        this.toasterService
          .pop('success', 'Success', 'Product deleted');
      }
    });
  }

  public openDialog(id) {
    const dialogConfig = new MatDialogConfig();
    const indexOrder = this.getIndexOrder(id);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      order: this.orders[indexOrder],
      fields: this.fields,
      title: 'Update order'
    };
    const dialogRef = this.dialog.open(ModalOrderComponent, dialogConfig);

    this.sub = dialogRef.afterClosed().subscribe(result => {
      this.updateOrder(result);
    });
  }

  updateOrder(result) {
    this.orderService.updateOrder(result).subscribe(response => {
      if (response.data) {
        const idOrder = this.getIndexOrder(response.data.id);
        this.orders[idOrder] = response.data;
      }
    });
  }

  private getIndexOrder(id) {
    return this.orders.findIndex(o => o.id === id);
  }

}
