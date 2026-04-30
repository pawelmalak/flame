import jwtDecode from 'jwt-decode';
import { parseTime } from '.';
import { Token } from '../interfaces';

export const decodeToken = (token: string): Token => {
  const decoded = jwtDecode(token) as Token;

  return decoded;
};

export const parseTokenExpire = (expiresIn: number): string => {
  const d = new Date(expiresIn * 1000);
  const p = parseTime;

  const useAmericanDate = localStorage.useAmericanDate === 'true';
  const useAmericanTime = localStorage.useAmericanTime === 'true';

  let hours = d.getHours();
  let timePeriod = '';
  if (useAmericanTime) {
    timePeriod = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12;
  }

  const time = `${p(hours)}:${p(d.getMinutes())}:${p(d.getSeconds())}${timePeriod}`;

  if (useAmericanDate) {
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${time}`;
  } else {
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${time}`;
  }
};
