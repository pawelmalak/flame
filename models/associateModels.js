const Category = require('./Category');
const Bookmark = require('./Bookmark');

const associateModels = () => {
  // Category <> Bookmark
  Bookmark.belongsTo(Category, { foreignKey: 'categoryId' });
  Category.hasMany(Bookmark, {
    as: 'bookmarks',
    foreignKey: 'categoryId'
  });
}

module.exports = associateModels;