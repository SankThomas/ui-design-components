import { useMemo } from "react";
import { getMonthDays, days, isSameDay, isDateBetween } from "./utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar({
  monthDate,
  startDate,
  endDate,
  onSelectDate,
  onPrevious,
  onNext,
  showPrevious,
  showNext,
}) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        {showPrevious ? (
          <button
            onClick={onPrevious}
            className="flex size-10 items-center justify-center rounded-xl border border-rose-400 text-slate-700 transition hover:bg-rose-50"
          >
            <ChevronLeft className="size-5" />
          </button>
        ) : (
          <div className="size-10" />
        )}

        <h3 className="text-base font-semibold text-slate-700 sm:text-lg">
          {monthDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        {showNext ? (
          <button
            onClick={onNext}
            className="flex size-10 items-center justify-center rounded-xl border border-rose-400 text-slate-700 transition hover:bg-rose-50"
          >
            <ChevronRight className="size-5" />
          </button>
        ) : (
          <div className="size-10" />
        )}
      </div>

      <div className="grid grid-cols-7 gap-y-3 text-center sm:gap-y-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-xs font-semibold text-slate-700 sm:text-sm"
          >
            {day}
          </div>
        ))}

        {monthDays.map((date, index) => {
          if (!date) {
            return <div key={index} />;
          }

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);

          const inRange = isDateBetween(date, startDate, endDate);

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={`mx-auto flex size-9 items-center justify-center rounded-xl text-xs font-medium transition sm:size-10 sm:text-sm ${
                isStart || isEnd
                  ? "bg-rose-400 text-white"
                  : inRange
                    ? "bg-rose-100 text-slate-700"
                    : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
