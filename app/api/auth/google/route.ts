export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") === "admin" ? "admin" : "patron";
  const redirectUrl = searchParams.get("redirect") || (role === "admin" ? "/admin" : "/");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  // Derive the base URL from the actual incoming request rather than a
  // hardcoded/guessed env value - this works correctly in local dev,
  // preview deployments, and production without any config drift.
  // NEXTAUTH_URL is an optional override for cases where the public origin
  // differs from the request (e.g. behind a reverse proxy).
  const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;

  // If Google credentials are not yet configured in .env, redirect to interactive sign-in
  if (!clientId) {
    const target = role === "admin" ? "/admin/login?google_auth=prompt" : "/?google_auth=prompt";
    return Response.redirect(new URL(target, request.url));
  }

  const redirectUri = `${baseUrl}/api/auth/google/callback`;
  const state = Buffer.from(JSON.stringify({ role, redirectUrl })).toString("base64");

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("state", state);
  googleAuthUrl.searchParams.set("access_type", "offline");
  googleAuthUrl.searchParams.set("prompt", "select_account");

  return Response.redirect(googleAuthUrl.toString());
}
