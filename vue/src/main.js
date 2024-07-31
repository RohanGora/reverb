import { createApp } from 'vue';
import App from './App.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// Set the base URL for Axios to point to your API
axios.defaults.baseURL = "http://localhost:8020"; // Assuming your API is hosted locally on port 8020

// Optionally, you can set common headers
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: "ws-key",
    wsHost: "localhost",
    wsPort: 8080,
    wssPort: 443,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

const app = createApp(App);

app.config.globalProperties.$echo = echo;

app.mount('#app');
