/**
 * @description Prepare data for logging by cutting according to the limit.
 */
export function cutLongDataForLog(data: string, limit: number): string {
  if (data && data.length > limit) {
    data = data.substring(0, limit) + '... Truncated: ' + data.length;
  }
  return data;
}
