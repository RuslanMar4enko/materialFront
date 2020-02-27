import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Order} from '../../model/order';
import {ModalOrderComponent} from '../modal-order/modal-order.component';
import {Field} from '../../model/field';
import fields from './field';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public order = new Order();
  public fields: Array<Field>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fields = fields;
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

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
