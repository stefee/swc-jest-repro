import { Temporal } from "@js-temporal/polyfill";

export function parseDate(date: string) {
  try {
    return Temporal.PlainDate.from(date);
  } catch (err) {
    if (err instanceof RangeError) {
      return null;
    }
    throw err;
  }
}

export function parseDateRange(
  startDate: string,
  endDate: string,
  {
    min = { days: 1 },
    max = { years: 1 },
  }: { min?: Temporal.DurationLike; max?: Temporal.DurationLike } = {}
): [Temporal.PlainDate | null, Temporal.PlainDate | null] {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end) {
    return [start, end];
  }

  const difference = start.until(end);

  // Invalidate if the difference between start and end is too big or small.
  if (Temporal.Duration.compare(difference, min, { relativeTo: start }) < 0) {
    return [null, null];
  }
  if (Temporal.Duration.compare(difference, max, { relativeTo: start }) > 0) {
    return [null, null];
  }

  return [start, end];
}
