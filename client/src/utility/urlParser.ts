export const urlParser = (url: string): string[] => {
  let parsedUrl: string;
  let displayUrl: string;

  if (/https?:\/\//.test(url)) {
    // Url starts with http[s]:// -> leave it as it is
    parsedUrl = url;
  } else {
    // No protocol -> apply http:// prefix
    parsedUrl = `http://${url}`;
  }

  // Create simplified url to display as text
  displayUrl = url
    .replace(/https?:\/\//, '')
    .replace('www.', '')
    .replace(/\/$/, '');

  return [displayUrl, parsedUrl]
}