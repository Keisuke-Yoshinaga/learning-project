/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import ToastPlugin from "vue-toast-notification";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(ToastPlugin);
}
