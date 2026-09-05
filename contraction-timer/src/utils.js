export function formatClockTime(date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins <= 0) return `${secs} sec`;

  return `${mins} min ${String(secs).padStart(2, "0")} sec`;
}

export function formatTimer(totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

  const secs = String(totalSeconds % 60).padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;
}
