const Category = require('./Category');
const Bookmark = require('./Bookmark');

const associateModels = () => {
  Category.hasMany(Bookmark, {
    foreignKey: 'categoryId',
    as: 'bookmarks'
  });

  Bookmark.belongsTo(Category, {
    foreignKey: 'categoryId'
  });
}

module.exports = associateModels;