import { queries } from './searchQueries.json';
import { Query, SearchResult } from '../interfaces';
import { store } from '../store/store';

export const searchParser = (searchQuery: string): SearchResult => {
  const result: SearchResult = {
    isLocal: false,
    isURL: false,
    sameTab: false,
    search: '',
    query: {
      name: '',
      prefix: '',
      template: '',
    },
  };

  const { customQueries, config } = store.getState().config;

  // Check if url or ip was passed
  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;

  result.isURL = urlRegex.test(searchQuery);

  // Match prefix and query
  const splitQuery = searchQuery.match(/^\/([a-z]+)[ ](.+)$/i);

  const prefix = splitQuery ? splitQuery[1] : config.defaultSearchProvider;

  const search = splitQuery
    ? encodeURIComponent(splitQuery[2])
    : encodeURIComponent(searchQuery);

  const query = [...queries, ...customQueries].find(
    (q: Query) => q.prefix === prefix
  );

  // If search provider was found
  if (query) {
    result.query = query;
    result.search = search;

    if (prefix === 'l') {
      result.isLocal = true;
    } else {
      result.sameTab = config.searchSameTab;
    }

    return result;
  }

  return result;
};
