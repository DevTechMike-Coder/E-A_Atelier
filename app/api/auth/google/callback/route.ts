import { authenticateWithGoogle } from "@/app/actions/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const stateRaw = searchParams.get("state");
  const errorParam = searchParams.get("error");

  const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;

  let role: "ADMIN" | "PATRON" = "PATRON";
  let redirectTarget = "/";

  if (stateRaw) {
    try {
      const parsed = JSON.parse(Buffer.from(stateRaw, "base64").toString("utf-8"));
      if (parsed.role === "admin") role = "ADMIN";
      if (parsed.redirectUrl) redirectTarget = parsed.redirectUrl;
    } catch {
      // fallback
    }
  }

  if (errorParam || !code) {
    const errTarget = role === "ADMIN" 
      ? `/admin/login?error=${encodeURIComponent(errorParam || "Google authentication was cancelled.")}`
      : `/?error=${encodeURIComponent(errorParam || "Google authentication was cancelled.")}`;
    return Response.redirect(new URL(errTarget, baseUrl));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId || "",
        client_secret: clientSecret || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      throw new Error(tokenData.error_description || "Failed to exchange token with Google.");
    }

    // 2. Fetch Google User Profile
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userInfo = await userInfoRes.json();
    if (!userInfo.email) {
      throw new Error("Could not retrieve email address from Google profile.");
    }

    // 3. Authenticate with strict role isolation
    const authResult = await authenticateWithGoogle({
      email: userInfo.email,
      name: userInfo.name,
      avatarUrl: userInfo.picture,
      googleId: userInfo.sub,
      targetRole: role,
    });

    if (!authResult.ok) {
      const failTarget = role === "ADMIN"
        ? `/admin/login?error=${encodeURIComponent(authResult.error || "Authentication failed.")}`
        : `/?error=${encodeURIComponent(authResult.error || "Authentication failed.")}&open_sanctuary=true`;
      return Response.redirect(new URL(failTarget, baseUrl));
    }

    // Success redirect
    const successTarget = role === "ADMIN" ? "/admin" : "/?patron_vault=open";
    return Response.redirect(new URL(successTarget, baseUrl));
  } catch (err: any) {
    console.error("Google OAuth callback error:", err);
    const failTarget = role === "ADMIN"
      ? `/admin/login?error=${encodeURIComponent(err.message || "OAuth processing failed.")}`
      : `/?error=${encodeURIComponent(err.message || "OAuth processing failed.")}`;
    return Response.redirect(new URL(failTarget, baseUrl));
  }
}
