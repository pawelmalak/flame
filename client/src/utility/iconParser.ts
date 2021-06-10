export const iconParser = (mdiName: string): string => {
  let parsedName = mdiName
    .split('-')
    .map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join('');
  parsedName = `mdi${parsedName}`;

  return parsedName;
}