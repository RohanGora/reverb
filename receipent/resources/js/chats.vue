<template>
    <div class="chat card">
        <div class="scrollable card-body" ref="hasScrolledToBottom">
            <template v-for="message in messages">

                <div class="message message-receive">
                    <p>
                        {{ message.message }}
                    </p>
                </div>
            </template>
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
import { reactive, inject, ref, onMounted, onUpdated } from 'vue';
import axios from 'axios';
export default {
    setup(props) {
        let messages = ref([])
        let newMessage = ref('')
        let hasScrolledToBottom = ref('')

        onMounted(() => {
            fetchMessages();
        })

        onUpdated(() => {
            scrollBottom()
        })

        Echo.channel('chat-channel')
            .listen('SendMessage', (e) => {
                messages.value.push(e.message);
            })
        const fetchMessages = async () => {
            axios.get('/api/get-messages').then(response => {
                messages.value = response.data;
            });
        }

        const addMessage = async () => {
            axios.post('/api/store-messages', { message: newMessage.value }).then(response => {
                fetchMessages();
                newMessage.value = ''
            });
        }

        const scrollBottom = () => {
            if (messages.value.length > 1) {
                let el = hasScrolledToBottom.value;
                el.scrollTop = el.scrollHeight;
            }
        }

        return {
            messages,
            newMessage,
            addMessage,
            fetchMessages,
            hasScrolledToBottom
        }
    }
}
</script>