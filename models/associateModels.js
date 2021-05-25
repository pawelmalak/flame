const Category = require('./Category');
const Bookmark = require('./Bookmark');

const associateModels = () => {
  // Category <> Bookmark
  Category.hasMany(Bookmark, {
    as: 'bookmarks',
    foreignKey: 'categoryId'
  });
  Bookmark.belongsTo(Category, { foreignKey: 'categoryId' });
}

module.exports = associateModels;