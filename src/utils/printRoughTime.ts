export const printRoughTime = (time: Date): string => {
  let timeOffset = (new Date().getTime() - time.getTime()) / 1000;

  if (timeOffset < 60) {
    // 60 seconds
    return `${timeOffset.toFixed(0)} 秒`;
  }

  timeOffset /= 60;
  if (timeOffset < 60) {
    // 60 Minutes
    return `${timeOffset.toFixed(0)} 分钟`;
  }

  timeOffset /= 60;
  if (timeOffset < 24) {
    // 24 Hour
    return `${timeOffset.toFixed(0)} 小时`;
  }

  timeOffset /= 24;
  return `${timeOffset.toFixed(0)} 天`;
};
