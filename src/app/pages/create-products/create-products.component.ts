import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import fields from './field';
import {Field} from '../../model/field';
import {CreateProduct} from '../../model/create-product';
import {ActivatedRoute} from '@angular/router';
import {SmartFormComponent} from '../../components/smart-form/smart-form.component';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit, OnDestroy {
  public fields: Array<Field>;
  private shopId;
  public newProduct: any;
  private sub: any;
  @ViewChild(SmartFormComponent, {static: false}) private smartForm: SmartFormComponent;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.fields = fields;
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
    this.newProduct = product;
  }

  private saveProduct() {
    this.smartForm.save((product) => {
      return this.productService.saveProduct(product);
    });
  }


}
