import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {Products} from '../../model/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Array<Products>;
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }


  getProducts() {
    this.productService.getAllProduct().subscribe(response => {
      this.products = response.data;
    });
  }

}
