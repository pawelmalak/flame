import { IconKey } from 'skycons-ts';

export interface WeatherCondition {
  code: number;
  icon: {
    day: IconKey;
    night: IconKey;
  }
}

export enum TimeOfDay {
  day,
  night
}

const mapFromJson = require('./WeatherMapping.json')

export class IconMapping {
  private conditions: WeatherCondition[] = mapFromJson.mapping

  mapIcon(weatherStatusCode: number, timeOfDay: TimeOfDay): IconKey {
    const mapping = this.conditions.find((condition: WeatherCondition) => condition.code === weatherStatusCode);

    if (mapping) {
      if (timeOfDay === TimeOfDay.day) {
        return mapping.icon.day;
      } else if (timeOfDay === TimeOfDay.night) {
        return mapping.icon.night;
      }
    }

    return 'clear-day';
  }
}