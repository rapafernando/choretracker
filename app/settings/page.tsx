import Link from "next/link";
import { ProtectedShell } from "@/components/ProtectedShell";
import { requireSession } from "@/lib/auth/session";

export default async function SettingsPage() {
  const { session, household } = await requireSession();

  return (
    <ProtectedShell
      title="Settings"
      description="Review household context and roles enforced server-side"
    >
      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Household context</h3>
          <p className="text-slate-700">Current household: <strong>{household.name}</strong></p>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            <li>Timezone: {household.timezone}</li>
            <li>Guardians: {household.guardians.join(", ")}</li>
            <li>Children: {household.children.join(", ")}</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Roles</h3>
          <p className="text-slate-700">
            Session role: <strong>{session.user.role}</strong> (available roles: {session.roles.join(", ")})
          </p>
          <p className="text-sm text-slate-600">
            Adjust permissions by modifying <code>lib/auth/session.ts</code> and updating the middleware.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Identity providers</h3>
          <p className="text-slate-700">
            OAuth/OIDC provider metadata can be configured in <code>lib/auth/providers.ts</code> and consumed by your API routes.
            Add credentials via environment variables to enable Google, Microsoft, and Apple sign-in.
          </p>
          <p className="text-sm text-slate-600">
            To reset the demo cookie, clear site data or override the session in <Link href="/login" className="font-semibold text-indigo-700">login</Link>.
          </p>
        </section>
      </div>
    </ProtectedShell>
  );
}
