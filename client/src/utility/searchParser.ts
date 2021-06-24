import { queries } from './searchQueries.json';
import { Query } from '../interfaces';

import { searchConfig } from '.';

export const searchParser = (searchQuery: string): void => {
  const space = searchQuery.indexOf(' ');
  const prefix = searchQuery.slice(1, space);
  const search = encodeURIComponent(searchQuery.slice(space + 1));

  const query = queries.find((q: Query) => q.prefix === prefix);

  if (query) {
    const sameTab = searchConfig('openSameTab', false);

    if (sameTab) {
      document.location.replace(`${query.template}${search}`);
    } else {
      window.open(`${query.template}${search}`);
    }
  }
}