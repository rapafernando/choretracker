export type OidcProvider = {
  id: "google" | "microsoft" | "apple";
  name: string;
  issuer: string;
  scopes: string[];
  clientIdEnv: string;
  clientSecretEnv: string;
};

const providers: OidcProvider[] = [
  {
    id: "google",
    name: "Google",
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email", "https://www.googleapis.com/auth/calendar.readonly"],
    clientIdEnv: "GOOGLE_CLIENT_ID",
    clientSecretEnv: "GOOGLE_CLIENT_SECRET"
  },
  {
    id: "microsoft",
    name: "Microsoft",
    issuer: "https://login.microsoftonline.com/common/v2.0",
    scopes: ["openid", "profile", "email", "offline_access", "Calendars.Read"],
    clientIdEnv: "MICROSOFT_CLIENT_ID",
    clientSecretEnv: "MICROSOFT_CLIENT_SECRET"
  },
  {
    id: "apple",
    name: "Apple",
    issuer: "https://appleid.apple.com",
    scopes: ["openid", "name", "email"],
    clientIdEnv: "APPLE_CLIENT_ID",
    clientSecretEnv: "APPLE_CLIENT_SECRET"
  }
];

export function getOidcProviders() {
  return providers;
}

export function getEnabledProviders() {
  return providers.map((provider) => ({
    ...provider,
    enabled: Boolean(process.env[provider.clientIdEnv] && process.env[provider.clientSecretEnv])
  }));
}

export const emailPasswordSupported = true;
