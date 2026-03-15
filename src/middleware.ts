import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Always include root
    "/",
    // Match all pathnames except for
    // - /api, /trpc, /_next, /_vercel, /studio
    // - files with extensions (e.g. favicon.ico)
    "/((?!api|trpc|_next|_vercel|studio|.*\\..*).*)",
  ],
};
