import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../model/field';
import {SmartFormClass} from '../../model/smart-form-class';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss']
})
export class SmartFormComponent implements OnInit {
  @Input() fields: Array<Field> = [];
  public formRows: Array<SmartFormClass> = [];

  @Input('rows') set rows(rows) {
    this.formRows = [];
    for (const row of rows) {
      const smartClass = new SmartFormClass();
      smartClass.cols = row;
      const formControl = {};
      for (const field of this.fields) {
        formControl[field.name] = new FormControl(smartClass.cols[field.name], field.validations);
      }
      for (const property in row) {
        if (formControl[property] === undefined) {
          formControl[property] = new FormControl(smartClass.cols[property]);
        }
      }
      smartClass.formGroup = new FormGroup(formControl);
      this.formRows.push(smartClass);
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  public getErrors(row, field): Array<string> {
    const errors = row.formGroup.controls[field.name].errors;
    const errorMessages = [];
    if (errors) {
      for (const error in errors) {
        if (error) {
          errorMessages.push(this.getErrorMessage(error, field.title));
        }
      }
    }
    return errorMessages;
  }

  getErrorMessage(error, title): string {
    switch (error) {
      case 'required':
        return `${title} is required`;
      case 'min':
        return `${title} min value is ${error.min}`;
      case 'max':
        return `${title} max value is ${error.max}`;
      case 'email':
        return `${title} mast be valid email`;
      case 'minLength':
        return `${title} min length is ${error.minLength}`;
      case 'maxLength':
        return `${title} max length is ${error.maxLength}`;
      case 'requiredIf':
        return `${title} is required if Order state or Package state is ready`;
    }
  }

}
