import axios from "axios";

// Set the base URL for Axios to point to your API
axios.defaults.baseURL = "http://localhost:8020"; // Assuming your API is hosted locally on port 8020

// Optionally, you can set common headers
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Export axios to be accessible globally
window.axios = axios;

// Optionally, you can import other modules related to Axios, such as interceptors or plugins.

import "./echo";
