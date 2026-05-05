"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus cookie token dan tendang ke halaman login
    deleteCookie("auth_token");
    router.push("/login");
  };

  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* KONTEN UTAMA (Kanan) */}
      <div className="drawer-content flex flex-col bg-base-100 overflow-hidden">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 border-b border-base-300">
          <div className="flex-none">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-4 text-lg font-bold">
            Dashboard
          </div>
        </nav>
        
        {/* Area Page Content (tempat page.tsx di-render) */}
        <main className="flex-1 overflow-y-auto p-6 bg-base-200">
          {children}
        </main>
      </div>

      {/* SIDEBAR (Kiri) */}
      <div className="drawer-side border-r border-base-300 is-drawer-close:overflow-visible z-50">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64 pt-2">
          
          {/* Header/Logo Sidebar */}
          <div className="px-4 py-3 mb-2 w-full is-drawer-close:hidden">
            <h2 className="text-2xl font-extrabold flex gap-1">
              <span className="text-primary">Garuda</span>Cyber
            </h2>
          </div>

          {/* Menu Navigasi */}
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

          {/* Tombol Logout di Bottom */}
          <ul className="menu w-full px-2 mb-4 border-t border-base-300 pt-4 mt-auto">
            <li>
              <button onClick={handleLogout} className="text-error hover:bg-error/10 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5">
                  <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                  <path d="M9 12h12l-3-3m0 6l3-3"></path>
                </svg>
                <span className="is-drawer-close:hidden font-medium">Logout</span>
              </button>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}