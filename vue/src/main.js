import { createApp } from 'vue';
import App from './App.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// Set the base URL for Axios to point to your API
axios.defaults.baseURL = "http://localhost:8000"; // Assuming your API is hosted locally on port 8020

// Optionally, you can set common headers
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: "2520-acrux",
    wsHost: "localhost",
    wsPort: 8080,
    wssPort: 443,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzIzOTc0MzA3LCJleHAiOjE3MjQwMDY3MDcsIm5iZiI6MTcyMzk3NDMwNywianRpIjoiN3N3MFpSRWNWQlpQbTVwMiIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.kuTJeXeGXWyV_sujU7rgUlIvIf6QRu8taoAgBFPrnGs'
        }
    }
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echo = echo;

app.mount('#app');
