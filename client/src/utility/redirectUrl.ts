export const redirectUrl = (url: string, sameTab: boolean) => {
  if (sameTab) {
    document.location.replace(url);
  } else {
    window.open(url);
  }
};
