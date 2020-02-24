export interface Field {
  visible?: boolean;
  title: string;
  name: any;
  type?: 'text' | 'number' | 'select' | 'date' | 'time' | 'datetime' | 'checkbox' | 'file';
  options?: Array<string>;
  indexAsValue?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  class?: string;
  filter?: Array<string>;
  sortBy?: string;
  updateTime?: number;
  width?: number;
  validations?: Array<any>;
  style?: any;
  default?: any;
}
