import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAuth(callbackURL: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const safeCallbackURL =
      callbackURL.startsWith("/") && !callbackURL.startsWith("//")
        ? callbackURL
        : "/";

    redirect(`/signin?callbackURL=${encodeURIComponent(safeCallbackURL)}`);
  }

  return session;
}
