const queries = require('../../src/utility/searchQueries.json');
const fs = require('fs');
const prettier = require('prettier');

/**
 * @description CLI tool for adding new search engines/providers. It will ensure that prefix is unique and that all entries are sorted alphabetically
 * @argumens name prefix template
 * @example node cli-searchQueries.js "DuckDuckGo" "d" "https://duckduckgo.com/?q="
 */

// Get arguments
const args = process.argv.slice(2);

// Check arguments
if (args.length < 3) {
  return console.log('Missing arguments');
} else if (args.length > 3) {
  return console.log('Too many arguments provided');
}

// Construct new query object
const newQuery = {
  name: args[0],
  prefix: args[1],
  template: args[2],
};

// Get old queries
let rawQueries = queries.queries;
let parsedQueries = '';

// Check if prefix is unique
const isUnique = !rawQueries.find((query) => query.prefix == newQuery.prefix);

if (!isUnique) {
  return console.log('Prefix already exists');
}

// Add new query
rawQueries.push(newQuery);

// Sort alphabetically
rawQueries = rawQueries.sort((a, b) => {
  const _a = a.name.toLowerCase();
  const _b = b.name.toLowerCase();

  if (_a < _b) return -1;
  if (_a > _b) return 1;
  return 0;
});

// Format JSON
parsedQueries = JSON.stringify(queries);
parsedQueries = prettier.format(parsedQueries, { parser: 'json' });

// Save file
fs.writeFileSync('../../src/utility/searchQueries.json', parsedQueries);
