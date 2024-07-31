<template>
  <div class="chat card" id="app">
    <div class="scrollable card-body" ref="hasScrolledToBottom">
      <div v-for="(message, index) in messages" :key="index">

        <div class="message message-receive">
          <p>
            {{ message.message }}
          </p>
        </div>
      </div>
    </div>

    <div class="chat-form input-group">
      <input id="btn-input" type="text" name="message" class="form-control input-sm message-"
        placeholder="Type your message here..." v-model="newMessage" @keyup.enter="addMessage">

      <span class="input-group-btn">
        <button class="btn btn-primary" id="btn-chat" @click="addMessage">
          Send
        </button>
      </span>
    </div>

  </div>
</template>
<script>
import axios from 'axios';

// Set the base URL for Axios to point to your API
axios.defaults.baseURL = "http://localhost:8020"; // Assuming your API is hosted locally on port 8020

// Optionally, you can set common headers
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      hasScrolledToBottom: ''
    };
  },
  mounted() {
    this.fetchMessages();
    this.$echo.channel('chat-channel').listen('SendMessage', (e) => {
      this.messages.push(e.message);
      this.$nextTick(this.scrollBottom);
    });
  },
  updated() {
    this.scrollBottom();
  },
  methods: {
    fetchMessages() {
      axios.get('/api/get-messages').then(response => {
        this.messages = response.data;
      });
    },
    addMessage() {
      axios.post('/api/store-messages', { message: this.newMessage }).then(() => {
        this.fetchMessages();
        this.newMessage = '';
      });
    },
    scrollBottom() {
      if (this.messages.length > 1) {
        let el = this.$refs.hasScrolledToBottom;
        el.scrollTop = el.scrollHeight;
      }
    }
  }
};
</script>