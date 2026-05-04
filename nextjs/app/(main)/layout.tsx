"use client";

import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="flex-1">
          <span className="text-lg font-bold">Garuda App</span>
        </div>

        <div className="flex gap-2">
          <a href="/dashboard" className="btn btn-ghost btn-sm">
            Dashboard
          </a>

          {/* Theme Switch */}
          <button
            className="btn btn-sm"
            onClick={() =>
              setTheme(theme === "dark" ? "corporate" : "dark")
            }
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-100 border-t">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} Garuda Cyber Test
        </p>
      </footer>
    </div>
  );
}