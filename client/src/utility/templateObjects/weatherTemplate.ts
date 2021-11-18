import { Weather } from '../../interfaces';

export const weatherTemplate: Weather = {
  externalLastUpdate: '',
  tempC: 0,
  tempF: 0,
  isDay: 1,
  cloud: 0,
  conditionText: '',
  conditionCode: 1000,
  id: -1,
  createdAt: new Date(),
  updatedAt: new Date(),
  humidity: 0,
  windK: 0,
  windM: 0,
};
