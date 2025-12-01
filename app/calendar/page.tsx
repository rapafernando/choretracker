import { ProtectedShell } from "@/components/ProtectedShell";
import { requireSession } from "@/lib/auth/session";

export default async function CalendarPage() {
  const { session, household } = await requireSession();

  return (
    <ProtectedShell
      title="Calendar"
      description={`${household.name} (${household.timezone}) household schedule`}
    >
      <table className="table-grid" role="grid">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Title</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          {household.calendar.map((event) => (
            <tr key={event.id}>
              <td>{new Date(event.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</td>
              <td>{event.title}</td>
              <td>{event.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm text-slate-600">
        Role-aware access: signed in as <strong>{session.user.role}</strong> with household ID <code>{session.user.householdId}</code>.
      </p>
    </ProtectedShell>
  );
}
