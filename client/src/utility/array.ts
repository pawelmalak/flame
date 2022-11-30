export const arrayPartition = <T>(
  arr: T[],
  isValid: (e: T) => boolean
): T[][] => {
  let pass: T[] = [];
  let fail: T[] = [];

  arr.forEach((e) => (isValid(e) ? pass : fail).push(e));

  return [pass, fail];
};

export const insertAt = <T>(arr: T[], index: number, element: T): T[] => [
  ...arr.slice(0, index),
  element,
  ...arr.slice(index + 1),
];
