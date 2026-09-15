"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "ea_atelier_admin_token";
const DEFAULT_KEY = "ea-atelier-provenance-2026";

function getExpectedKey() {
  return process.env.ATELIER_OWNER_KEY || DEFAULT_KEY;
}

export async function verifyAdminPasskey(passkey: string) {
  if (!passkey || passkey.trim() === "") {
    return { ok: false, error: "Please enter the atelier owner passkey." };
  }

  const expected = getExpectedKey();
  if (passkey.trim() !== expected) {
    return { ok: false, error: "Invalid master passkey. Access restricted to atelier custodian." };
  }

  const cookieStore = await cookies();
  // Set session cookie (valid for 7 days)
  cookieStore.set(COOKIE_NAME, "authorized_owner_session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { ok: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { ok: true };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === "authorized_owner_session";
}
