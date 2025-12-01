import Link from "next/link";
import { getEnabledProviders, getOidcProviders } from "@/lib/auth/providers";

export default function HomePage() {
  const providers = getOidcProviders();
  const enabled = getEnabledProviders();

  return (
    <div className="space-y-8">
      <section className="card p-6">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Choretracker</h1>
        <p className="mt-2 text-slate-700">
          This starter bundles a protected dashboard with calendar, chore tracking, and a flexible auth
          layer that can be wired to Google, Microsoft, Apple, or password-based login.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="nav-tab" href="/login">
            Go to sign in
          </Link>
          <Link className="nav-tab" href="/calendar">
            View protected demo
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-5 space-y-3">
          <h2 className="text-xl font-semibold">SSO-ready providers</h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {providers.map((provider) => (
              <li key={provider.id}>
                <strong>{provider.name}</strong> ({provider.issuer}) — scopes: {provider.scopes.join(", ")}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600">
            Environment variables determine whether a provider is enabled: {enabled
              .map((provider) => `${provider.name}: ${provider.enabled ? "enabled" : "awaiting keys"}`)
              .join(" • ")}
            .
          </p>
        </div>

        <div className="card p-5 space-y-3">
          <h2 className="text-xl font-semibold">Household-first roles</h2>
          <p className="text-slate-700">
            Sessions include a household context and support <strong>parent</strong>, <strong>guardian</strong>, and
            <strong> child</strong> roles so feature flags and permissions can be aligned server-side.
          </p>
          <p className="text-sm text-slate-600">Navigate to the protected tabs to see the demo data.</p>
        </div>
      </section>
    </div>
  );
}
