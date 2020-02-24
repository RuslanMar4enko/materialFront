import {Field} from '../../model/field';
import {Validators} from '@angular/forms';

const fields: Array<Field> = [
  {
    name: 'sku',
    title: 'Sku',
    type: 'number',
    validations: [Validators.required],
  },
  {
    name: 'brand',
    title: 'Brand',
    type: 'text',
    validations: [
      Validators.required,
      Validators.max(255)],
  },
  {
    name: 'name',
    title: 'Name',
    type: 'text',
    validations: [
      Validators.required,
      Validators.max(255)
    ],
  },
  {
    name: 'price',
    title: 'Price',
    type: 'number',
    validations: [Validators.required],
  },
  {
    name: 'description',
    title: 'Description',
    type: 'text',
    validations: [Validators.required],
  },
  {
    name: 'image',
    title: 'Image',
    type: 'file',
    validations: [Validators.required],
  },
];

export default fields;
