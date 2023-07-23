import searchQueries from './searchQueries.json';
import { SearchResult } from '../interfaces';
import { store } from '../store/store';
import { isUrlOrIp } from '.';

export const searchParser = (searchQuery: string): SearchResult => {
  const queries = searchQueries.queries;

  const result: SearchResult = {
    isLocal: false,
    isURL: false,
    sameTab: false,
    encodedURL: '',
    primarySearch: {
      name: '',
      prefix: '',
      template: '',
    },
    secondarySearch: {
      name: '',
      prefix: '',
      template: '',
    },
    rawQuery: searchQuery,
  };

  const { customQueries, config } = store.getState().config;

  // Check if url or ip was passed
  result.isURL = isUrlOrIp(searchQuery);

  // Match prefix and query
  const splitQuery = searchQuery.match(/^\/([a-z]+)[ ](.+)$/i);

  // Extract prefix
  const prefix = splitQuery ? splitQuery[1] : config.defaultSearchProvider;

  // Encode url
  const encodedURL = splitQuery
    ? encodeURIComponent(splitQuery[2])
    : encodeURIComponent(searchQuery);

  // Find primary search engine template
  const findProvider = (prefix: string) => {
    return [...queries, ...customQueries].find((q) => q.prefix === prefix);
  };

  const primarySearch = findProvider(prefix);
  const secondarySearch = findProvider(config.secondarySearchProvider);

  // If search providers were found
  if (primarySearch) {
    result.primarySearch = primarySearch;
    result.encodedURL = encodedURL;

    if (prefix === 'l') {
      result.isLocal = true;
    }

    result.sameTab = config.searchSameTab;

    if (secondarySearch) {
      result.secondarySearch = secondarySearch;
    }

    return result;
  }

  return result;
};
