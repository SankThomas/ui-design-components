export const days = ["S", "M", "T", "W", "T", "F", "S"];

export function formatInputDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function isSameDay(a, b) {
  return (
    a?.getDate() === b?.getDate() &&
    a?.getMonth() === b?.getMonth() &&
    a?.getFullYear() === b?.getFullYear()
  );
}

export function isDateBetween(date, start, end) {
  if (!start || !end) return false;

  const current = new Date(date).setHours(0, 0, 0, 0);
  const from = new Date(start).setHours(0, 0, 0, 0);
  const to = new Date(end).setHours(0, 0, 0, 0);

  return current > from && current < to;
}

export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const result = [];

  for (let i = 0; i < startDay; i++) {
    result.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    result.push(new Date(year, month, i));
  }

  return result;
}

export function startOfWeek(date) {
  const value = new Date(date);
  const day = value.getDay();

  value.setDate(value.getDate() - day);
  value.setHours(0, 0, 0, 0);

  return value;
}

export function endOfWeek(date) {
  const value = startOfWeek(date);

  value.setDate(value.getDate() + 6);
  value.setHours(23, 59, 59, 999);

  return value;
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
