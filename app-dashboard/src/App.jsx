import Sidebar from "./Sidebar";
import TableContent from "./TableContent";

export default function App() {
  return (
    <main className="flex">
      <div className="fixed size-72 bg-blue-600/50 rounded-full blur-3xl"></div>
      <div className="fixed size-72 bg-rose-600/50 rounded-full blur-3xl right-4 top-1/2 -z-10"></div>

      <Sidebar />

      <div className="flex-1 lg:ml-72 h-full">
        <TableContent />
      </div>
    </main>
  );
}
