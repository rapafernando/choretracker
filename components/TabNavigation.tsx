"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/calendar", label: "Calendar" },
  { href: "/chores", label: "Chores" },
  { href: "/settings", label: "Settings" }
];

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="nav-tabs" role="tablist">
        {tabs.map((tab) => {
          const isActive = pathname?.startsWith(tab.href);
          return (
            <li key={tab.href} role="presentation">
              <Link
                href={tab.href}
                role="tab"
                aria-selected={isActive}
                data-active={isActive}
                className="nav-tab"
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
