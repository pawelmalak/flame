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
  const useAmericanTime = localStorage.useAmericanTime === 'true';
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
  const p = parseTime;
  let timeEl = '';
  let timePeriod = '';

  if (showTime) {
    let hours = now.getHours();
    if (useAmericanTime) {
      timePeriod = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }

    const time = `${p(hours)}:${p(now.getMinutes())}:${p(
      now.getSeconds()
    )}${timePeriod}`;

    timeEl = time;
  }

  // Separator
  let separator = '';

  if (!hideDate && showTime) {
    separator = ' - ';
  }

  // Output
  return `${dateEl}${separator}${timeEl}`;
};
