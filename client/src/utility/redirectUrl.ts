import { urlParser } from '.';

export const redirectUrl = (url: string, sameTab: boolean) => {
  const parsedUrl = urlParser(url)[1];

  if (sameTab) {
    document.location.assign(parsedUrl);
  } else {
    window.open(parsedUrl);
  }
};
