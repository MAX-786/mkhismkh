import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://mkhismkh.com",
  integrations: [react(), tailwind(), icon()],
  output: "server",
  adapter: vercel(),
});