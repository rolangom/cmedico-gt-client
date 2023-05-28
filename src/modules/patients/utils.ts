// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recordToFullName(record: any): string {
  return `${record.firstName} ${record.lastName}`;
}
