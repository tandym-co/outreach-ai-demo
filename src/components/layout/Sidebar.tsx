"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/prospects", label: "Prospects" },
  { href: "/chat", label: "Chat" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-gray-900 text-white flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-700">
        <span className="font-semibold text-lg tracking-tight">OutreachAI</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname.startsWith(href)
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
