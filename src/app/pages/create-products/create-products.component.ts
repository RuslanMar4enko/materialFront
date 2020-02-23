import {Component, OnDestroy, OnInit} from '@angular/core';
import fields from './field';
import {Field} from '../../model/field';
import {CreateProduct} from '../../model/create-product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit, OnDestroy {
  public fields: Array<Field>;
  private shopId;
  public newProduct: any = [];
  private sub: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fields = fields;
    console.log(this.fields);
    this.sub = this.route.params.subscribe(params => {
      this.shopId = params.id;
      this.createNewOrder();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private createNewOrder() {
    const product = new CreateProduct();
    product.shop_id = this.shopId;
    this.newProduct = [product];
  }

}
