"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    href: "/prospects",
    label: "Prospects",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/chat",
    label: "AI Assistant",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

function TandymLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7 shrink-0">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4DD9FF" />
          <stop offset="100%" stopColor="#00F5A0" />
        </linearGradient>
      </defs>
      <rect x="1" y="2" width="17" height="17" rx="3" fill="url(#tg)" opacity="0.85" />
      <rect x="21" y="7" width="10" height="10" rx="2" fill="url(#tg)" opacity="0.7" />
      <rect x="7" y="22" width="10" height="10" rx="2" fill="url(#tg)" opacity="0.7" />
      <rect x="19" y="20" width="19" height="19" rx="3" fill="url(#tg)" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 flex flex-col h-full" style={{ backgroundColor: "#0A1628" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "#1a2d4a" }}>
        <div className="flex items-center gap-2.5">
          <TandymLogo />
          <div>
            <div
              className="font-bold text-sm tracking-widest"
              style={{
                background: "linear-gradient(135deg, #4DD9FF, #00F5A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              TANDYM
            </div>
            <div className="text-xs tracking-wide" style={{ color: "#3a5570" }}>
              OutreachAI
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1e3a58" }}>
          Navigation
        </p>
        {nav.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={
                active
                  ? {
                      background: "linear-gradient(135deg, rgba(77,217,255,0.12), rgba(0,245,160,0.12))",
                      color: "#00F5A0",
                      borderLeft: "2px solid #00F5A0",
                    }
                  : { color: "#3a5a7a" }
              }
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "#1a2d4a" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "linear-gradient(135deg, #4DD9FF, #00F5A0)", color: "#0A1628" }}
          >
            N
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "#7a9ab8" }}>
              Nacho Baigorria
            </p>
            <p className="text-xs" style={{ color: "#2a4a68" }}>
              Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
