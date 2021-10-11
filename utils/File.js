const fs = require('fs');

class File {
  constructor(path) {
    this.path = path;
    this.content = null;
  }

  read() {
    try {
      const content = fs.readFileSync(this.path, { encoding: 'utf-8' });
      this.content = content;
      return this.content;
    } catch (err) {
      return err.message;
    }
  }

  write(data, isJSON) {
    this.content = data;
    fs.writeFileSync(
      this.path,
      isJSON ? JSON.stringify(this.content) : this.content
    );
  }
}

module.exports = File;
