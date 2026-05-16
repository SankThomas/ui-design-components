import Calendar from "./Calendar";
import { useState } from "react";
import {
  formatInputDate,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "./utils";

export default function App() {
  const today = new Date();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [leftMonth, setLeftMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const rightMonth = new Date(
    leftMonth.getFullYear(),
    leftMonth.getMonth() + 1,
    1,
  );

  const handleDateSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (date < startDate) {
      setEndDate(startDate);
      setStartDate(date);
      return;
    }

    setEndDate(date);
  };

  const setRange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const quickRanges = [
    {
      label: "Today",
      action: () => {
        setRange(today, today);
      },
    },
    {
      label: "This week",
      action: () => {
        setRange(startOfWeek(today), endOfWeek(today));
      },
    },
    {
      label: "Last week",
      action: () => {
        const lastWeek = new Date(today);

        lastWeek.setDate(today.getDate() - 7);

        setRange(startOfWeek(lastWeek), endOfWeek(lastWeek));
      },
    },
    {
      label: "Last 7 days",
      action: () => {
        const start = new Date(today);

        start.setDate(today.getDate() - 6);

        setRange(start, today);
      },
    },
    {
      label: "This month",
      action: () => {
        setRange(startOfMonth(today), endOfMonth(today));
      },
    },
    {
      label: "Last month",
      action: () => {
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1,
        );

        setRange(startOfMonth(lastMonth), endOfMonth(lastMonth));
      },
    },
  ];

  const compareRanges = [
    "Yesterday",
    "This week",
    "Last week",
    "Last 14 days",
    "Last 30 days",
    "This year",
  ];

  const handlePrevious = () => {
    setLeftMonth(
      new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1, 1),
    );
  };

  const handleNext = () => {
    setLeftMonth(
      new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1),
    );
  };

  return (
    <div className="min-h-screen bg-rose-50 px-3 py-6 sm:px-5 sm:py-10">
      <div className="mx-auto w-full max-w-7xl rounded-3xl bg-white p-4 shadow-xl sm:p-6 lg:p-10">
        <div className="flex flex-col gap-10 xl:flex-row">
          <div className="w-full xl:max-w-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={formatInputDate(startDate)}
                  readOnly
                  className="h-12 w-full rounded-xl border border-rose-400 px-4 text-sm font-medium text-slate-700 outline-none"
                />

                <span className="hidden text-sm text-slate-400 sm:block">
                  to
                </span>

                <input
                  type="text"
                  value={endDate ? formatInputDate(endDate) : "Select date"}
                  readOnly
                  className="h-12 w-full rounded-xl border border-rose-400 px-4 text-sm font-medium text-slate-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  {quickRanges.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="flex h-11 w-full items-center rounded-xl px-4 text-sm font-medium text-slate-700 transition hover:bg-rose-100"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {compareRanges.map((item) => (
                    <button
                      key={item}
                      className="flex h-11 w-full items-center rounded-xl px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
            <Calendar
              monthDate={leftMonth}
              startDate={startDate}
              endDate={endDate}
              onSelectDate={handleDateSelect}
              onPrevious={handlePrevious}
              showPrevious
            />

            <Calendar
              monthDate={rightMonth}
              startDate={startDate}
              endDate={endDate}
              onSelectDate={handleDateSelect}
              onNext={handleNext}
              showNext
            />
          </div>
        </div>
      </div>
    </div>
  );
}
