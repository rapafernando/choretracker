import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHouseholdContext } from "@/lib/data/households";

export type Role = "parent" | "guardian" | "child";

export type Session = {
  user: {
    id: string;
    name: string;
    role: Role;
    householdId: string;
  };
  roles: Role[];
};

const SESSION_COOKIE = "choretracker_session";

export async function getSession(): Promise<Session | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie) return null;

  try {
    const parsed = JSON.parse(sessionCookie.value);
    return parsed as Session;
  } catch (error) {
    console.error("Invalid session cookie", error);
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const household = await getHouseholdContext(session.user.householdId);
  return { session, household };
}

export function createDemoSession(role: Role = "parent") {
  return {
    user: {
      id: "demo-user",
      name: "Jamie Doe",
      role,
      householdId: "household-1"
    },
    roles: ["parent", "guardian", "child"]
  } satisfies Session;
}

export function clearSession() {
  cookies().delete(SESSION_COOKIE);
}

export function persistSession(session: Session) {
  cookies().set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}
