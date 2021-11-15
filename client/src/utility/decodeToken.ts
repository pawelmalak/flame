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
  const time = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;

  if (useAmericanDate) {
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${time}`;
  } else {
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${time}`;
  }
};
