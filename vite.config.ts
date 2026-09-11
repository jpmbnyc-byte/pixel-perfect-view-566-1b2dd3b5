// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const cloudflare = Boolean(
  process.env['NITRO_PRESET'] === "cloudflare-module" ||
    process.env['CLOUDFLARE'] ||
    process.env['CF_PAGES'],
);

export default defineConfig({
  // Cloudflare is production. Vercel Hobby still works when Vercel CI sets its env.
  // Lovable's sandbox still forces cloudflare-module. Do not add a second nitro().
  nitro: cloudflare
    ? {
        preset: "cloudflare-module",
        cloudflare: { nodeCompat: true, deployConfig: false },
      }
    : { preset: "vercel" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
