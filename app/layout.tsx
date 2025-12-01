import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Choretracker",
  description: "Household chores and calendar coordinator"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Choretracker</span>
              <span className="text-lg font-bold">Family coordination dashboard</span>
            </div>
            <div className="text-sm text-slate-600" aria-live="polite">
              Protected demo workspace
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
