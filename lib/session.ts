import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Signed session cookies.
 *
 * Replaces the previous implementation, which stored a constant string
 * ("authorized_owner_session") or a raw, unsigned user id directly in the
 * cookie value. Neither of those let the server know *which* user a request
 * belonged to (the admin UI could only ever show hardcoded, fake data), and
 * neither prevented a client from forging/guessing a valid cookie value.
 *
 * Tokens here are `base64url(payload).base64url(HMAC-SHA256(payload))`,
 * verified with a timing-safe comparison and an expiry check before the
 * embedded user id is ever trusted.
 */

const ADMIN_COOKIE = "ea_atelier_admin_session";
const PATRON_COOKIE = "ea_atelier_patron_session";

const ADMIN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const PATRON_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

type Role = "ADMIN" | "PATRON";

interface SessionPayload {
  sub: string; // user id
  role: Role;
  iat: number;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length < 32) {
    // Fail closed. No fallback/default secret is allowed - a hardcoded
    // fallback here would just reintroduce the same class of bug this
    // module exists to remove.
    throw new Error(
      "SESSION_SECRET environment variable must be set to a random string of at least 32 characters before sessions can be created or verified. Generate one with: openssl rand -base64 48"
    );
  }
  return secret;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
}

function encode(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decode(token: string | undefined, expectedRole: Role): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;

  let expectedSig: string;
  try {
    expectedSig = sign(body);
  } catch {
    return null; // SESSION_SECRET missing/misconfigured
  }

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null; // signature invalid -> tampered or forged token
  }

  try {
    const payload: SessionPayload = JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
    if (payload.role !== expectedRole) return null;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (typeof payload.sub !== "string" || !payload.sub) return null;
    return payload.sub;
  } catch {
    return null;
  }
}

// ---- Admin session ----

export async function setAdminSession(userId: string) {
  const now = Math.floor(Date.now() / 1000);
  const token = encode({ sub: userId, role: "ADMIN", iat: now, exp: now + ADMIN_MAX_AGE });
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function getAdminUserId(): Promise<string | null> {
  const store = await cookies();
  return decode(store.get(ADMIN_COOKIE)?.value, "ADMIN");
}

// ---- Patron session ----

export async function setPatronSession(userId: string) {
  const now = Math.floor(Date.now() / 1000);
  const token = encode({ sub: userId, role: "PATRON", iat: now, exp: now + PATRON_MAX_AGE });
  const store = await cookies();
  store.set(PATRON_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PATRON_MAX_AGE,
  });
}

export async function clearPatronSession() {
  const store = await cookies();
  store.delete(PATRON_COOKIE);
}

export async function getPatronUserId(): Promise<string | null> {
  const store = await cookies();
  return decode(store.get(PATRON_COOKIE)?.value, "PATRON");
}
