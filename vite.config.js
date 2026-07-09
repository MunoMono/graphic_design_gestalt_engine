import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/graphic_design_gestalt_engine/",
  plugins: [react()],
});