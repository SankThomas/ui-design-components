import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";

function formatClockTime(date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins <= 0) return `${secs} sec`;

  return `${mins} min ${String(secs).padStart(2, "0")} sec`;
}

function formatTimer(totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

  const secs = String(totalSeconds % 60).padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;
}

export default function App() {
  const [isTiming, setIsTiming] = useState(false);

  const [timer, setTimer] = useState(0);

  const [contractions, setContractions] = useState([]);

  const [lastContractionEnd, setLastContractionEnd] = useState(null);

  const intervalRef = useRef(null);

  const contractionStartRef = useRef(null);

  useEffect(() => {
    if (!isTiming) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isTiming]);

  const startContraction = () => {
    contractionStartRef.current = new Date();

    setTimer(0);

    setIsTiming(true);
  };

  const stopContraction = () => {
    clearInterval(intervalRef.current);

    const endTime = new Date();

    const startTime = contractionStartRef.current;

    const duration = timer;

    let timeApart = null;

    if (lastContractionEnd) {
      timeApart = Math.floor((startTime - lastContractionEnd) / 1000);
    }

    const newContraction = {
      id: Date.now(),
      duration,
      timeApart,
      start: formatClockTime(startTime),
      end: formatClockTime(endTime),
    };

    setContractions((prev) => [newContraction, ...prev]);

    setLastContractionEnd(endTime);

    setIsTiming(false);

    setTimer(0);
  };

  const latestGap =
    contractions.length > 0 && contractions[0].timeApart !== null
      ? formatDuration(contractions[0].timeApart)
      : "--";

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4 overflow-hidden">
      <div className="relative">
        <div className="absolute top-10 left-10 w-96 h-full rounded-3xl bg-indigo-950" />

        <div className="relative z-10 w-96 h-155 bg-zinc-50 rounded-3xl shadow-xl px-5 pt-5 pb-4 flex flex-col">
          <div className="flex items-center justify-between">
            <button className="text-indigo-950">
              <ArrowLeft size={22} />
            </button>

            <h1 className="text-lg font-medium text-indigo-950">
              Contraction timer
            </h1>

            <button className="text-indigo-950">
              <Bell size={22} />
            </button>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-5xl leading-none font-semibold text-indigo-950">
              {formatTimer(timer)}
            </h2>

            <p className="mt-5 text-sm text-indigo-900">
              Time since last contraction
            </p>

            <p className="mt-1 text-xl font-semibold text-indigo-950">
              {latestGap}
            </p>

            {!isTiming ? (
              <button
                onClick={startContraction}
                className="mt-6 bg-indigo-950 text-white px-8 py-3 rounded-full text-base font-semibold hover:opacity-90 transition"
              >
                Start timing
              </button>
            ) : (
              <button
                onClick={stopContraction}
                className="mt-6 bg-indigo-950 text-white px-8 py-3 rounded-full text-base font-semibold hover:opacity-90 transition"
              >
                Stop timing
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 text-center text-xs text-gray-400 mt-10 px-2">
            <p>Length</p>
            <p>Time apart</p>
            <p>Start & end</p>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-3">
            {contractions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No contractions yet
              </div>
            ) : (
              contractions.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-3 items-center text-center rounded-xl px-3 py-3 text-sm ${
                    index % 2 === 0 ? "bg-indigo-100" : "bg-transparent"
                  }`}
                >
                  <p className="text-slate-800">{item.duration}s</p>

                  <p className="text-slate-800">
                    {item.timeApart !== null
                      ? formatDuration(item.timeApart)
                      : "--"}
                  </p>

                  <p className="text-slate-800 text-xs">
                    {item.start} - {item.end}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
