export const urlParser = (url: string): string[] => {
  let parsedUrl: string;
  let displayUrl: string;

  if (/(https?|steam):\/\//.test(url)) {
    // Url starts with http[s]:// or steam:// -> leave it as it is
    parsedUrl = url;
  } else {
    // No protocol -> apply http:// prefix
    parsedUrl = `http://${url}`;
  }

  // Create simplified url to display as text
  if (/steam:\/\//.test(url)) {
    displayUrl = 'Run Steam App';
  } else {
    displayUrl = url
    .replace(/https?:\/\//, '')
    .replace('www.', '')
    .replace(/\/$/, '');
  }
  
  return [displayUrl, parsedUrl]
}