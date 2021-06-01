const fs = require('fs');

class Logger {
  constructor() {
    this.logFileHandler();
  }

  logFileHandler() {
    if (!fs.existsSync('./flame.log')) {
      fs.writeFileSync('./flame.log', '');
    } else {
      console.log('file exists');
    }
  }

  writeLog(logMsg, logType) {

  }

  generateLog(logMsg, logType) {
    const now = new Date();
    const date = `${this.parseNumber(now.getDate())}-${this.parseNumber(now.getMonth() + 1)}-${now.getFullYear()}`;
    const time = `${this.parseNumber(now.getHours())}:${this.parseNumber(now.getMinutes())}:${this.parseNumber(now.getSeconds())}.${now.getMilliseconds()}`;
    const log = `[${date} ${time}]: ${logType} ${logMsg}`;
    return log;
    //  const timestamp = new Date().toISOString();
  }

  parseNumber(number) {
    if (number > 9) {
      return number;
    } else {
      return `0${number}`;
    }
  }
}

// console.log(logger.generateLog('testMsg', 'INFO'));

module.exports = new Logger();