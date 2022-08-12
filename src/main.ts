import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

// Prism
import Prism from "prismjs";
// highlight code
import "prismjs/components/prism-json";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueMarkdownEditor);
app.mount("#app");
