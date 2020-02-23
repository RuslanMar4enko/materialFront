import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShopsService} from '../../services/shops/shops.service';
import {Products} from '../../model/products';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.scss']
})
export class ShopProductComponent implements OnInit, OnDestroy {
  private sub: any;
  private shopId;
  public products: Array<Products>;
  constructor(private route: ActivatedRoute,
              private shopsService: ShopsService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.shopId = params.id;
      this.getShopProduct();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getShopProduct() {
    this.shopsService.getShopProduct(this.shopId).subscribe(response => {
      this.products = response.data;
    });
  }

}
