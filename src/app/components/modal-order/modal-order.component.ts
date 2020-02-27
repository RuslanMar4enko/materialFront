import {Component, Inject, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss']
})
export class ModalOrderComponent implements OnInit {
  public order: Order;

  constructor(
    private dialogRef: MatDialogRef<ModalOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

    this.order = data;
  }

  ngOnInit() {
      console.log(this.order);
  }



}
