import type { FixedTuple } from './types';

export type GreetingsSchema = Readonly<FixedTuple<string, 4>>;
export type DaysSchema = Readonly<FixedTuple<string, 7>>;
export type MonthsSchema = Readonly<FixedTuple<string, 12>>;

export type DateTimeConfig = {
  daySchema: DaysSchema;
  monthSchema: MonthsSchema;
  useAmericanDate: boolean;
  hideTime: boolean;
  hideDate: boolean;
};

export type GreetingConfig = {
  greetingsSchema: GreetingsSchema;
};

export type HeaderConfig = DateTimeConfig &
  GreetingConfig & {
    hideHeader: boolean;
  };

export const DEFAULT_DAYS: DaysSchema = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DEFAULT_MONTHS: MonthsSchema = [
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

export const DEFAULT_GREETINGS: GreetingsSchema = [
  'Good evening!',
  'Good afternoon!',
  'Good morning!',
  'Good night!',
];

// TMP PLACEHOLDER UNTIL CONFIG SYSTEM IS READY
export const PLACEHOLDER_HEADER_CONFIG: HeaderConfig = {
  greetingsSchema: DEFAULT_GREETINGS,
  daySchema: DEFAULT_DAYS,
  monthSchema: DEFAULT_MONTHS,
  useAmericanDate: false,
  hideTime: false,
  hideHeader: false,
  hideDate: false,
};
