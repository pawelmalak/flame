import { Model } from '.';

export interface Weather extends Model {
  externalLastUpdate: string;
  tempC: number;
  tempF: number;
  isDay: number;
  cloud: number;
  conditionText: string;
  conditionCode: number;
  humidity: number;
  windK: number;
  windM: number;
}
