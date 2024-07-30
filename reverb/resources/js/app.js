import "./bootstrap";
import { createApp } from "vue";
import chats from "./chats.vue";

const app = createApp({});
app.component("chats", chats);
app.mount("#app");
