"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Posts", path: "/posts" },
    { name: "Create Post", path: "/posts/create" },
  ];

  return (
    <aside className="w-64 bg-base-100 border-r hidden md:flex flex-col">
      {/* LOGO */}
      <div className="p-6 text-xl font-bold border-b">
        Garuda App
      </div>

      {/* MENU */}
      <ul className="menu p-4 space-y-1">
        {menu.map((item) => {
          const isActive =
            pathname === item.path ||
            pathname.startsWith(item.path + "/");

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`
                  flex items-center gap-2 rounded-lg px-3 py-2 transition-all
                  ${
                    isActive
                      ? "bg-primary text-primary-content font-semibold shadow"
                      : "hover:bg-base-200"
                  }
                `}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}