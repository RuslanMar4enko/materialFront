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
    validations: [Validators.required],
  },
  {
    name: 'delivery',
    title: 'Delivery',
    type: 'text',
    validations: [Validators.required],
  },
  {
    name: 'phone',
    title: 'Phone',
    type: 'text',
    validations: [Validators.required],
  },
];

export default fields;
