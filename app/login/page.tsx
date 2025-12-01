import Link from "next/link";
import { getEnabledProviders } from "@/lib/auth/providers";

export default function LoginPage() {
  const providers = getEnabledProviders();

  return (
    <section className="space-y-6">
      <div className="card p-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Authentication</p>
        <h1 className="text-2xl font-bold text-slate-900">Sign in to your household</h1>
        <p className="text-slate-700">
          Use an identity provider or the demo email/password flow. OAuth/OIDC wiring is abstracted so
          provider keys can be dropped into environment variables.
        </p>
      </div>

      <div className="responsive-grid" role="list">
        <article className="card p-5 space-y-3" role="listitem">
          <h2 className="text-xl font-semibold">Single sign-on</h2>
          <p className="text-sm text-slate-600">Enabled providers are listed below. Buttons can be swapped for actual OAuth triggers.</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="OAuth providers">
            {providers.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className="nav-tab"
                disabled={!provider.enabled}
                aria-disabled={!provider.enabled}
              >
                {provider.name} {provider.enabled ? "ready" : "(add keys)"}
              </button>
            ))}
          </div>
        </article>

        <article className="card p-5 space-y-3" role="listitem">
          <h2 className="text-xl font-semibold">Email + password</h2>
          <p className="text-sm text-slate-600">This route is optional but scaffolded so you can plug in your provider.</p>
          <form className="space-y-3" method="post" action="/api/auth/demo">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                placeholder="parent@example.com"
                required
                autoComplete="email"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="role">
              Role
              <select
                id="role"
                name="role"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                defaultValue="parent"
              >
                <option value="parent">Parent</option>
                <option value="guardian">Guardian</option>
                <option value="child">Child</option>
              </select>
            </label>
            <button type="submit" className="nav-tab w-full justify-center">
              Sign in (demo)
            </button>
          </form>
          <p className="text-xs text-slate-500">
            Submissions write a signed-in demo session cookie that the middleware uses to protect routes.
          </p>
        </article>
      </div>

      <p className="text-sm text-slate-600">
        When signed in, you will be redirected to the protected <Link href="/calendar" className="font-semibold text-indigo-700">tabs</Link>.
      </p>
    </section>
  );
}
