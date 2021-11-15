export const parseTime = (time: number, ms = false) => {
  if (ms) {
    if (time >= 10 && time < 100) {
      return `0${time}`;
    } else if (time < 10) {
      return `00${time}`;
    }
  }

  return time < 10 ? `0${time}` : time.toString();
};
