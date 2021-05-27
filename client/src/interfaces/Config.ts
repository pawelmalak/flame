import { Model } from './';

export interface Config extends Model {
  key: string;
  value: string;
  valueType: string;
  isLocked: boolean;
}