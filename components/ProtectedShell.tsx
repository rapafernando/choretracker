import { ReactNode } from "react";
import { TabNavigation } from "./TabNavigation";
import { getSession } from "@/lib/auth/session";

export async function ProtectedShell({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Protected</p>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description ? <p className="text-slate-600">{description}</p> : null}
        </div>
        <div className="rounded-lg bg-indigo-50 px-4 py-2 text-sm text-indigo-700" role="status">
          Signed in as <strong>{session?.user.name ?? "Unknown"}</strong> ({session?.user.role})
        </div>
      </div>
      <TabNavigation />
      <div className="card p-6" role="group" aria-label={`${title} content`}>
        {children}
      </div>
    </section>
  );
}
