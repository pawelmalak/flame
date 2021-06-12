export const greeter = (): string => {
  const now = new Date().getHours();
  let msg: string;

  if (now >= 18) msg = 'Good evening!';
  else if (now >= 12) msg = 'Good afternoon!';
  else if (now >= 6) msg = 'Good morning!';
  else if (now >= 0) msg = 'Good night!';
  else msg = 'Hello!';

  return msg;
}