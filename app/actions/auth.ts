"use server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import {
  setAdminSession,
  clearAdminSession,
  setPatronSession,
  clearPatronSession,
  getPatronUserId,
} from "@/lib/session";

const DEFAULT_PATRON_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";

// Emails allowed to self-provision an ADMIN account on first Google sign-in.
// Comma-separated in the environment, e.g. ATELIER_ADMIN_EMAILS="owner@example.com,co-founder@example.com"
// Without this, no *new* admin accounts can be created via Google sign-in -
// only emails already marked ADMIN in the database can log in that way.
const ADMIN_ALLOWLIST = (process.env.ATELIER_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export interface AuthResult {
  ok: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
    role: "ADMIN" | "PATRON";
    memberNumber: string | null;
  };
}

/**
 * Core authentication logic with strict role isolation:
 * - An admin email CANNOT be used to open or log in to a storefront patron account.
 * - A patron email CANNOT be used to log in to the admin studio portal.
 * - A Google account that isn't already an admin and isn't on the admin
 *   allowlist CANNOT self-provision admin access, closing off the previous
 *   "anyone who types an email in the modal becomes an admin" hole.
 *
 * This should only ever be called from trusted server-side code (the Google
 * OAuth callback route) that has independently verified the email/name/
 * googleId against Google's identity APIs - never directly from a client
 * component, or the role/email inputs here would be fully attacker-controlled.
 */
export async function authenticateWithGoogle({
  email,
  name,
  avatarUrl,
  googleId,
  targetRole,
}: {
  email: string;
  name?: string;
  avatarUrl?: string;
  googleId?: string;
  targetRole: "ADMIN" | "PATRON";
}): Promise<AuthResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return { ok: false, error: "Please provide a valid Google email address." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  // Strict Rule Check:
  // If user exists as an ADMIN, but attempts to sign in as PATRON on storefront
  if (existingUser && existingUser.role === "ADMIN" && targetRole === "PATRON") {
    return {
      ok: false,
      error:
        "This Google email is designated as an Atelier Admin account and cannot be used to open a storefront patron account. Please use a separate patron email.",
    };
  }

  // If user exists as a PATRON, but attempts to sign in as ADMIN in admin portal
  if (existingUser && existingUser.role === "PATRON" && targetRole === "ADMIN") {
    return {
      ok: false,
      error:
        "This Google email is registered as a storefront Patron account and does not have administrative privileges for the Atelier Studio.",
    };
  }

  // Block self-service privilege escalation: a brand-new Google account can
  // only land as ADMIN if it's been explicitly allowlisted.
  if (!existingUser && targetRole === "ADMIN" && !ADMIN_ALLOWLIST.includes(normalizedEmail)) {
    return {
      ok: false,
      error:
        "This Google account is not authorized for atelier admin access. Ask the atelier owner to add it to ATELIER_ADMIN_EMAILS.",
    };
  }

  let user = existingUser;

  // If user doesn't exist, create a new record with the target role
  if (!user) {
    const memberNumber =
      targetRole === "ADMIN" ? "ATELIER-CUSTODIAN" : `PATRON-${crypto.randomInt(100, 1000)}`;

    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name || (normalizedEmail.split("@")[0].charAt(0).toUpperCase() + normalizedEmail.split("@")[0].slice(1)),
        avatarUrl: avatarUrl || DEFAULT_PATRON_AVATAR,
        role: targetRole,
        googleId,
        memberNumber,
      },
    });
  } else {
    // Update profile info if new details came from Google
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || user.name,
        avatarUrl: avatarUrl || user.avatarUrl,
        googleId: googleId || user.googleId,
      },
    });
  }

  // Establish a signed session bound to this specific user id.
  if (targetRole === "ADMIN") {
    await setAdminSession(user.id);
  } else {
    await setPatronSession(user.id);
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      memberNumber: user.memberNumber,
    },
  };
}

/**
 * Get current logged in patron user and their profile data + orders
 */
export async function getCurrentPatronUser() {
  const patronId = await getPatronUserId();

  if (!patronId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: patronId },
    });

    if (!user || user.role !== "PATRON") {
      return null;
    }

    // Fetch user's orders and bespoke commissions
    const [orders, commissions] = await Promise.all([
      prisma.order.findMany({
        where: { customerEmail: user.email },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    take: 1,
                    orderBy: { position: "asc" },
                  },
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.bespokeCommission.findMany({
        where: { email: user.email },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

    return {
      ...user,
      orders,
      commissions,
    };
  } catch (err) {
    console.error("Error fetching patron user:", err);
    return null;
  }
}

/**
 * Sign out patron user
 */
export async function logoutPatronUser() {
  await clearPatronSession();
  return { ok: true };
}

/**
 * Sign out admin user (kept here alongside patron logout for callers that
 * import from auth.ts; delegates to the same session store adminAuth.ts uses).
 */
export async function logoutAdminUser() {
  await clearAdminSession();
  return { ok: true };
}

/**
 * Update patron tactile dossier / fit preferences
 */
export async function updatePatronDossier({
  fiberSensitivities,
  silhouetteDimensions,
  dyePreferences,
}: {
  fiberSensitivities?: string;
  silhouetteDimensions?: string;
  dyePreferences?: string;
}) {
  const patronId = await getPatronUserId();

  if (!patronId) {
    return { ok: false, error: "Not authenticated as patron." };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: patronId },
      data: {
        fiberSensitivities,
        silhouetteDimensions,
        dyePreferences,
      },
    });

    return { ok: true, user: updated };
  } catch (err) {
    console.error("Error updating tactile dossier:", err);
    return { ok: false, error: "Failed to update tactile dossier." };
  }
}
