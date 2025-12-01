import { ProtectedShell } from "@/components/ProtectedShell";
import { requireSession } from "@/lib/auth/session";

export default async function ChoresPage() {
  const { household } = await requireSession();

  return (
    <ProtectedShell
      title="Chores"
      description="Recurring household assignments broken down by cadence"
    >
      <div className="responsive-grid">
        {household.chores.map((chore) => (
          <article key={chore.id} className="card p-4" aria-label={chore.title}>
            <h3 className="text-lg font-semibold">{chore.title}</h3>
            <p className="text-slate-600">Cadence: {chore.cadence}</p>
            <p className="text-slate-600">Assignee: {chore.assignee}</p>
          </article>
        ))}
      </div>
    </ProtectedShell>
  );
}
