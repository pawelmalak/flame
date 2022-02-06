const parse = require('node-bookmarks-parser');
var sqlite3 = require('sqlite3').verbose();
const File = require('./File');
const databaseFilePath = 'data/db.sqlite';

let bookmarks = [];

function saveBookmarks() {
  const db = new sqlite3.Database(databaseFilePath);
  const importDate = new Date().toISOString();

  db.serialize(() => {
    db.all(`SELECT id, name FROM categories`, (err, data) => {
      if (err) {
      }

      for (const bookmark of bookmarks) {
        // Found in db.
        let stmt = db.prepare(
          'INSERT INTO bookmarks (name, url, categoryId, icon, createdAt, updatedAt) VALUES(?,?,?,?,?,?)'
        );
        stmt.run(
          bookmark.title,
          bookmark.url,
          data.find(
            (r) => r.name.toLowerCase() === bookmark.category.toLowerCase()
          )?.id,
          bookmark.icon,
          importDate,
          importDate,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
        stmt.finalize();
      }
    });
  });
}

function saveCategories() {
  let db = new sqlite3.Database(databaseFilePath);
  let uniqueCats = [...new Set(bookmarks.map((r) => r.category))];
  const importDate = new Date().toString();

  db.serialize(() => {
    db.all(`SELECT * FROM categories`, (err, data) => {
      if (err) {
        console.error(err);
      }

      for (const newCaterory of uniqueCats) {
        for (const category of data) {
          if (category.name.toLowerCase() === newCaterory.toLowerCase()) {
            continue;
          }
        }

        let stmt = db.prepare(
          'INSERT INTO categories (name, createdAt, updatedAt) VALUES(?,?,?)'
        );
        stmt.run(newCaterory, importDate, importDate, (err) => {
          if (err) {
            console.error(err);
          }
        });
        stmt.finalize();
      }

      saveBookmarks();
    });
  });
}

function crawlBookmarks(bookmark, category) {
  if (bookmark.type === 'bookmark') {
    bookmarks.push({
      title: bookmark.title,
      url: bookmark.url,
      icon: bookmark.icon,
      category: category,
    });
  }

  if (bookmark.type === 'folder') {
    for (const child of bookmark.children) {
      crawlBookmarks(child, bookmark.title);
    }
  }
}

module.exports = function importBookmark(path) {
  const fileContent = new File(path).read();
  const bookmarkData = parse(fileContent);

  for (const bookmark of bookmarkData) {
    crawlBookmarks(bookmark);
  }

  saveCategories();
};
