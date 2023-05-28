const LOCAL_DATE = Object.freeze(new Date());

export function buildLocalDate(dateStr: string): Date {
  const date = new Date(dateStr);
  date.setTime(date.getTime() + LOCAL_DATE.getTimezoneOffset() * 60_000);
  return date;
}

/**
 *
 * @param {string} dateStr in format yyyy-mm-dd
 * @returns {string} date in format yyyy-mm-dd'T'hh24:mi:ss.ZZZz with local offset applied
 */
export function parseDate(dateStr: string): string {
  const date = buildLocalDate(dateStr);
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

export function calculateAge(birthday: string): number {
  // birthday is a date
  const birthDate = buildLocalDate(birthday);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
