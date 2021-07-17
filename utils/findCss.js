const fs = require('fs');
const { join } = require('path');
const Logger = require('./Logger');
const logger = new Logger();

// Check if flame.css exists in mounted docker volume. Create new file if not
const findCss = () => {
  const srcPath = join(__dirname, '../data/flame.css');
  const destPath = join(__dirname, '../public/flame.css');

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    logger.log('Custom CSS file found');
    return;
  }

  logger.log('Creating empty CSS file');
  fs.writeFileSync(destPath, '');

}

module.exports = findCss;