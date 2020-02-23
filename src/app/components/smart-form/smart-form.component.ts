import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../model/field';
import {SmartFormClass} from '../../model/smart-form-class';
import {FormControl, FormGroup} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss']
})
export class SmartFormComponent implements OnInit {
  @Input() fields: Array<Field> = [];
  public formRows: SmartFormClass;
  @Input() title = '';

  @Input('rows') set rows(rows) {
    const smartClass = new SmartFormClass();
    smartClass.cols = rows;
    const formControl = {};
    for (const field of this.fields) {
      formControl[field.name] = new FormControl(smartClass.cols[field.name], field.validations);
    }
    for (const property in rows) {
      if (formControl[property] === undefined) {
        formControl[property] = new FormControl(smartClass.cols[property]);
      }
    }
    smartClass.formGroup = new FormGroup(formControl);
    this.formRows = smartClass;
  }

  constructor(private toasterService: ToasterService) {
  }

  ngOnInit() {
  }

  public save(callback) {
    if (this.formRows.formGroup.invalid) {
      this.toasterService
        .pop('Warning', 'Warning', 'Validation error');
      return;
    }

    callback(this.formRows).subscribe(response => {
      console.log(response);
    // if (response.status === 'OK') {
    //   if (!response.result) {
    //     this.saveSuccess();
    //   } else {
    //     this.saveNew(response.result);
    //     this.saveSuccess();
    //   }
    // } else {
    //   this.toasterService
    //     .pop('warning', 'warning', response.status);
    // }
    });
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

  private getErrorMessage(error, title): string {
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
