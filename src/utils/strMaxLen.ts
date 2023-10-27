export const strMaxLen = (str: string, maxLen: number): string => {
  if (str.length > maxLen) {
    return str.substring(0, maxLen) + "...";
  } else {
    return str;
  }
};
