import { startOfToday, addMinutes, isToday, endOfToday } from 'date-fns';

const step = 15;

interface Options {
  start?: boolean;
  end?: boolean;
}

export function getTimes(options: Options = {}): Date[] {
  const result: Date[] = [];

  let date = startOfToday();
  if (!options.start) {
    date = addMinutes(date, step);
  }

  while (isToday(date)) {
    result.push(date);
    date = addMinutes(date, step);
  }

  if (isToday(addMinutes(date, -step / 2))) {
    result.push(endOfToday());
  }

  if (!options.end) {
    result.pop();
  }

  return result;
}
