/**
 * https://stackoverflow.com/a/30851002/16957052
 */
export const escapeRegex = (exp: string) => {
  return exp.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
};
