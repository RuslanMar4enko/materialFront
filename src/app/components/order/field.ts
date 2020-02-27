import {Field} from '../../model/field';
import {Validators} from '@angular/forms';

const fields: Array<Field> = [
  {
    name: 'address',
    title: 'Address',
    type: 'text',
    validations: [Validators.required],
  },
  {
    name: 'full_name',
    title: 'Full name',
    type: 'text',
    validations: [
      Validators.required,
      Validators.max(255)],
  },
  {
    name: 'delivery',
    title: 'Delivery',
    type: 'text',
    validations: [
      Validators.required,
      Validators.max(255)
    ],
  },
  {
    name: 'phone',
    title: 'Phone',
    type: 'number',
    validations: [Validators.required],
  },
];

export default fields;
