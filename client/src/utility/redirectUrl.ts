import { urlParser } from '.';

export const redirectUrl = (url: string, sameTab: boolean) => {
  const parsedUrl = urlParser(url)[1];

  if (sameTab) {
    document.location.replace(parsedUrl);
  } else {
    window.open(parsedUrl);
  }
};
