import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="drawer-side border-r border-base-300 is-drawer-close:overflow-visible z-50">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      
      <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64 pt-2">
        <div className="px-4 py-3 mb-2 w-full is-drawer-close:hidden">
          <h2 className="text-2xl font-extrabold flex gap-1">
            <span className="text-primary">Garuda</span>Cyber
          </h2>
        </div>

        <ul className="menu w-full grow gap-1 px-2">
          <li>
            <Link href="/posts" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Posts">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span className="is-drawer-close:hidden font-medium">Manage Posts</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}