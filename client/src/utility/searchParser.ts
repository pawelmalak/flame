import { useAtomValue } from 'jotai';
import { isUrlOrIp } from '.';
import { SearchResult } from '../interfaces';
import { configAtom } from '../state/config';
import { customQueriesAtom } from '../state/queries';
import { queries } from './searchQueries.json';

export const useSearchParser = () => {
  const customQueries = useAtomValue(customQueriesAtom);
  const config = useAtomValue(configAtom);

  return (searchQuery: string): SearchResult => {
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

    // Check if url or ip was passed
    result.isURL = isUrlOrIp(searchQuery);

    // Match prefix and query
    const splitQuery = searchQuery.match(/^\/([a-z]+)(.+)$/i);

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
};
