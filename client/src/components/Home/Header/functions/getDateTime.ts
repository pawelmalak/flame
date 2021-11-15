import { parseTime } from '../../../../utility';

export const getDateTime = (): string => {
  const days = localStorage.getItem('daySchema')?.split(';') || [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = localStorage.getItem('monthSchema')?.split(';') || [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const now = new Date();

  const useAmericanDate = localStorage.useAmericanDate === 'true';
  const showTime = localStorage.showTime === 'true';

  const p = parseTime;

  const time = `${p(now.getHours())}:${p(now.getMinutes())}:${p(
    now.getSeconds()
  )}`;

  const timeEl = showTime ? ` - ${time}` : '';

  if (!useAmericanDate) {
    return `${days[now.getDay()]}, ${now.getDate()} ${
      months[now.getMonth()]
    } ${now.getFullYear()}${timeEl}`;
  } else {
    return `${days[now.getDay()]}, ${
      months[now.getMonth()]
    } ${now.getDate()} ${now.getFullYear()}${timeEl}`;
  }
};
