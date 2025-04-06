import { createSSRApp } from "vue";
import App from "./App.vue";
import './style/main.css';
import pinia from "./store";

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
