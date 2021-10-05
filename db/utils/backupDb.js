const fs = require('fs');

const backupDB = () => {
  if (!fs.existsSync('data/db_backups')) {
    fs.mkdirSync('data/db_backups');
  }

  const version = process.env.VERSION;
  const slug = `db-${version.replace(/\./g, '')}-backup.sqlite`;

  const srcPath = 'data/db.sqlite';
  const destPath = `data/db_backups/${slug}`;

  if (fs.existsSync(srcPath)) {
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

module.exports = backupDB;
