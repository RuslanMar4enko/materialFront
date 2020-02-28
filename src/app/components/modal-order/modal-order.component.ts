import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../model/order';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Field} from '../../model/field';
import {SmartFormComponent} from '../smart-form/smart-form.component';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss']
})
export class ModalOrderComponent implements OnInit {
  public order: Order;
  public fields: Array<Field>;
  public title: string;
  @ViewChild(SmartFormComponent, {static: false}) private smartForm: SmartFormComponent;

  constructor(
    private dialogRef: MatDialogRef<ModalOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.order = data.order;
    this.fields = data.fields;
    this.title = data.title;
  }

  ngOnInit() {
  }


  getData() {
    const value = this.smartForm.getValue();
    this.dialogRef.close(value);
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
