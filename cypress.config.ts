import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://drajbstore.vercel.app",
    setupNodeEvents(on, config) {},
  },
  env: {
    preserveLocalStorage: true,
  },
});