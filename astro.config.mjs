import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import clerk from "@clerk/astro";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://mkhismkh.com",
  integrations: [
    react(),
    tailwind(),
    icon(),
    clerk({
      publishableKey: import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: import.meta.env.CLERK_SECRET_KEY,
    }),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    isr: {
      // Configure ISR expiration and allowed paths
      expiration: 60 * 60 * 24, // 24 hours
      allowQuery: ['updated'], // Allow ?updated=true query param to bypass cache
    },
  }),
});
