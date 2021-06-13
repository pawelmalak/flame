/**
 * Parse Material Desgin icon name to be used with mdi/js
 * @param mdiName Dash separated icon name from MDI, e.g. alert-box-outline
 * @returns Parsed icon name to be used with mdi/js, e.g mdiAlertBoxOutline
 */
export const iconParser = (mdiName: string): string => {
  let parsedName = mdiName
    .split('-')
    .map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join('');
  parsedName = `mdi${parsedName}`;

  return parsedName;
}