import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://mkhismkh.com",
  integrations: [react(), tailwind(), icon()],

  adapter: node({
    mode: "standalone",
  }),
});