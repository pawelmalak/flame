const fs = require('fs');

class File {
  constructor(path) {
    this.path = path;
    this.content = '';
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

  write(data) {
    this.content = data;
    fs.writeFileSync(this.path, this.content);
  }
}

module.exports = File;