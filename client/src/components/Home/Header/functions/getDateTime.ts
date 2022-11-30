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
  const hideDate = localStorage.hideDate === 'true';

  // Date
  let dateEl = '';

  if (!hideDate) {
    if (!useAmericanDate) {
      dateEl = `${days[now.getDay()]}, ${now.getDate()} ${
        months[now.getMonth()]
      } ${now.getFullYear()}`;
    } else {
      dateEl = `${days[now.getDay()]}, ${
        months[now.getMonth()]
      } ${now.getDate()} ${now.getFullYear()}`;
    }
  }

  // Time
  let timeEl = '';

  if (showTime) {
    timeEl = `${parseTime(now.getHours())}:${parseTime(
      now.getMinutes()
    )}:${parseTime(now.getSeconds())}`;
  }

  // Separator
  const separator = !hideDate && showTime ? ' · ' : '';

  // Output
  return `${dateEl}${separator}${timeEl}`;
};
