class Logger {
  log(message, level = 'INFO') {
    console.log(`[${this.generateTimestamp()}] [${level}] ${message}`);
  }

  generateTimestamp() {
    const d = new Date();

    // Date
    const year = d.getFullYear();
    const month = this.parseDate(d.getMonth() + 1);
    const day = this.parseDate(d.getDate());

    // Time
    const hour = this.parseDate(d.getHours());
    const minutes = this.parseDate(d.getMinutes());
    const seconds = this.parseDate(d.getSeconds());
    const miliseconds = this.parseDate(d.getMilliseconds(), true);

    // Timezone
    const tz = -d.getTimezoneOffset() / 60;

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}.${miliseconds} UTC${
      tz >= 0 ? '+' + tz : tz
    }`;
  }

  parseDate(date, ms = false) {
    if (ms) {
      if (date >= 10 && date < 100) {
        return `0${date}`;
      } else if (date < 10) {
        return `00${date}`;
      }
    }

    return date < 10 ? `0${date}` : date.toString();
  }
}

module.exports = Logger;
