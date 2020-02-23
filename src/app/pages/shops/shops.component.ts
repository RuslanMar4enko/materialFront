import {Component, OnInit} from '@angular/core';
import {ShopsService} from '../../services/shops/shops.service';
import {Shops} from '../../model/shops';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  public shops: Array<Shops>;

  constructor(private shopsService: ShopsService) {
  }

  ngOnInit() {
    this.getShops();
  }

  public getShops() {
    this.shopsService.shops().subscribe(response => {
      this.shops = response.data;
      console.log(this.shops);
    });
  }


}
