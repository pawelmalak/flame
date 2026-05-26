import type { DateTimeConfig, GreetingConfig } from './config';
import { padZero } from './utils/padZero';

export const formatDateTime = (now: Date, config: DateTimeConfig) => {
  let dateEl = '';

  if (!config.hideDate) {
    const day = config.daySchema[now.getDay()];
    const month = config.monthSchema[now.getMonth()];

    if (config.useAmericanDate) {
      dateEl = `${day}, ${month} ${now.getDate()} ${now.getFullYear()}`;
    } else {
      dateEl = `${day}, ${now.getDate()} ${month} ${now.getFullYear()}`;
    }
  }

  let timeEl = '';

  if (!config.hideTime) {
    timeEl = [now.getHours(), now.getMinutes(), now.getSeconds()].map(padZero).join(':');
  }

  const separator = !config.hideDate && !config.hideTime ? ' - ' : '';

  return `${dateEl}${separator}${timeEl}`;
};

export const pickGreeting = (now: Date, config: GreetingConfig) => {
  const [evening, afternoon, morning, night] = config.greetingsSchema;
  const hour = now.getHours();

  if (hour >= 18) {
    return evening;
  }

  if (hour >= 12) {
    return afternoon;
  }

  if (hour >= 6) {
    return morning;
  }

  return night;
};
