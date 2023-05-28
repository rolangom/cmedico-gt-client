const LOCAL_DATE = Object.freeze(new Date());

/**
 *
 * @param {string} dateStr in format yyyy-mm-dd
 * @returns {string} date in format yyyy-mm-dd'T'hh24:mi:ss.ZZZz with local offset applied
 */
export function parseDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setTime(date.getTime() + LOCAL_DATE.getTimezoneOffset() * 60_000);
  return date.toJSON();
}

/**
 *
 * @param {string|undefined} fullDateStr date in format yyyy-mm-dd'T'hh24:mi:ss.ZZZz
 * @returns {string|undefined} in format yyyy-mm-dd or undefined
 */
export function formatDateStr(
  fullDateStr: string | undefined
): string | undefined {
  if (!fullDateStr) return undefined;
  return fullDateStr.slice(0, 10);
}
