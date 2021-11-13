const fs = require('fs');
const { slugify } = require('./slugify');

const backupDB = () => {
  if (!fs.existsSync('data/db_backups')) {
    fs.mkdirSync('data/db_backups');
  }

  const slug = slugify();

  const srcPath = 'data/db.sqlite';
  const destPath = `data/db_backups/${slug}`;

  if (fs.existsSync(srcPath)) {
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

module.exports = backupDB;
