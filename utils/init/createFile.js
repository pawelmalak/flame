const fs = require('fs');
const { join } = require('path');

const Logger = require('../Logger');
const logger = new Logger();

const createFile = async (file) => {
  const { name, msg, template, isJSON, paths } = file;

  const srcPath = join(__dirname, paths.src, name);
  const destPath = join(__dirname, paths.dest, name);

  // Check if file exists
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);

    if (process.env.NODE_ENV == 'development') {
      logger.log(msg.found);
    }

    return;
  }

  // Create file if not
  fs.writeFileSync(destPath, isJSON ? JSON.stringify(template) : template);

  if (process.env.NODE_ENV == 'development') {
    logger.log(msg.created);
  }
};

module.exports = createFile;
