"use server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { setAdminSession, clearAdminSession, getAdminUserId } from "@/lib/session";

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still perform a same-length comparison so failure doesn't return early
    // and leak timing information about the real key's length.
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Master-passkey login for the atelier owner.
 *
 * There is no built-in default key anymore. ATELIER_OWNER_KEY and
 * ATELIER_OWNER_EMAIL must both be set in the environment, or this path is
 * disabled outright (fail closed, not fail open).
 */
export async function verifyAdminPasskey(passkey: string) {
  if (!passkey || passkey.trim() === "") {
    return { ok: false, error: "Please enter the atelier owner passkey." };
  }

  const expectedKey = process.env.ATELIER_OWNER_KEY;
  const ownerEmail = process.env.ATELIER_OWNER_EMAIL;

  if (!expectedKey || expectedKey.trim().length < 12) {
    return {
      ok: false,
      error:
        "Passkey login is not configured on this server. Set ATELIER_OWNER_KEY (12+ chars) in the environment to enable it.",
    };
  }

  if (!ownerEmail || !ownerEmail.includes("@")) {
    return {
      ok: false,
      error: "Passkey login is not configured on this server. Set ATELIER_OWNER_EMAIL in the environment to enable it.",
    };
  }

  if (!timingSafeStringEqual(passkey.trim(), expectedKey.trim())) {
    return { ok: false, error: "Invalid master passkey. Access restricted to atelier custodian." };
  }

  const normalizedOwnerEmail = ownerEmail.trim().toLowerCase();
  let owner = await prisma.user.findUnique({ where: { email: normalizedOwnerEmail } });

  if (!owner) {
    owner = await prisma.user.create({
      data: {
        email: normalizedOwnerEmail,
        name: "Atelier Owner",
        role: "ADMIN",
        memberNumber: "ATELIER-CUSTODIAN",
      },
    });
  }

  if (owner.role !== "ADMIN") {
    return { ok: false, error: "The account configured for ATELIER_OWNER_EMAIL is not provisioned as an admin." };
  }

  await setAdminSession(owner.id);
  return { ok: true };
}

export async function logoutAdmin() {
  await clearAdminSession();
  return { ok: true };
}

export async function isAdminAuthenticated() {
  return (await getAdminUserId()) !== null;
}

/**
 * Resolves the actual authenticated admin user from the signed session,
 * re-checked against the database on every call (role revocation takes
 * effect immediately instead of trusting a static cookie flag).
 */
export async function getCurrentAdminUser() {
  const userId = await getAdminUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") return null;

  return user;
}
