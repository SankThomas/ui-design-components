export default function Sidebar() {
  return (
    <div className="h-screen w-72 fixed p-4">
      <div
        className="p-4 h-full rounded-xl flex flex-col items-start justify-between
        bg-white/10 backdrop-blur-lg border-4 border-white/50
        shadow-lg"
      >
        <div className="flex items-center justify-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="rounded-full size-16 object-cover"
          />

          <article>
            <h4 className="text-base">Thomas Sankara</h4>
            <p className="text-sm text-gray-900/75">example@gmail.com</p>
          </article>
        </div>

        <ul className="flex flex-col gap-10">
          <li>
            <a href="#" className="bg-white p-4 hover:opacity-75 rounded-lg">
              Recent files
            </a>
          </li>
          <li>
            <a href="#" className="p-4 hover:bg-white/75 transition rounded-lg">
              Documents
            </a>
          </li>
          <li>
            <a href="#" className="p-4 hover:bg-white/75 transition rounded-lg">
              Videos
            </a>
          </li>
        </ul>

        <div className="bg-blue-600 rounded-lg p-4 space-y-4 text-white text-center">
          <h2 className="font-bold">Upgrade to PRO</h2>
          <p className="text-sm text-white/75">
            Unlock features like collaboration and unlimited storage
          </p>

          <button className="bg-white rounded text-blue-500 p-4 text-sm hover:bg-white/75">
            Upgrade account
          </button>
        </div>
      </div>
    </div>
  );
}
