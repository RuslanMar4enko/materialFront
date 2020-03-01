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

  public getValue() {
    this.messageInvalid();
    return this.formRows.formGroup.value;
  }

  public save(callback) {

    this.messageInvalid();
    let value = this.formRows.formGroup.value;
    if (value.image !== undefined) {
      value = this.toFormData(value);
    }
    callback(value).subscribe(response => {
      if (response.data) {
        this.toasterService
          .pop('Success', 'Success', 'Status success');
        this.resetValue();
      }
    });
  }

  resetValue() {
    for (const field of this.fields) {
      if (field.name === 'image') {
        (document.getElementById('file') as HTMLInputElement).value = '';
      }
      this.formRows.formGroup.get(field.name).reset();
    }
  }


  private messageInvalid(): boolean {
    if (this.formRows.formGroup.invalid) {
      this.toasterService
        .pop('Warning', 'Warning', 'Validation error');
      return;
    }
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


  imageUpload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formRows.formGroup.patchValue({
      image: file
    });
    this.formRows.formGroup.get('image').updateValueAndValidity();
  }

  private toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.set(key, value);
    }

    return formData;
  }

}
