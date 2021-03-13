export function getTomorrow(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
}

export function startOfTomorrow(): Date {
  const tomorrow = getTomorrow();

  tomorrow.setUTCHours(0);
  tomorrow.setUTCMinutes(0);
  tomorrow.setUTCSeconds(0);
  tomorrow.setUTCMilliseconds(0);

  return tomorrow;
}

export function endOfTomorrow(): Date {
  const tomorrow = getTomorrow();

  tomorrow.setUTCHours(23);
  tomorrow.setUTCMinutes(59);
  tomorrow.setUTCSeconds(59);
  tomorrow.setUTCMilliseconds(0);

  return tomorrow;
}
