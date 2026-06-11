import Menu from "./components/Menu";

export default function App() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-r from-pink-100 via-pink-50 to-indigo-100">
      {/* Background circles */}

      <div className="absolute left-32 bottom-20 h-44 w-44 rounded-full bg-pink-200 opacity-50" />

      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-purple-200 opacity-40" />

      <div className="absolute right-0 bottom-40 h-40 w-40 rounded-full bg-pink-200 opacity-50" />

      <div className="absolute right-72 bottom-24 h-28 w-28 rounded-full bg-white opacity-50" />

      <div className="absolute top-28 h-8 w-8 rounded-full bg-white opacity-80" />

      <Menu />
    </div>
  );
}
