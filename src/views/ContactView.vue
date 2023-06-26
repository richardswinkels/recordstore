<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">Contact</h2>
    <p class="mb-4">Get in Touch with VinylVibes!
    We're excited to connect with you! Whether you have a question, need assistance, VinylVibes is here to assist. Simply fill out the contact form below, and our friendly team will respond promptly.</p>
    <form>
      <div class="form-row">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="contactMessage.name" required>
      </div>
      <div class="form-row">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="contactMessage.email" required>
      </div>
      <div class="form-row">
        <label for="message">Message:</label>
        <textarea id="message" cols="30" rows="10" v-model="contactMessage.message" required></textarea>
      </div>
      <div class="text-right">
        <button class="button-red" @click.prevent="sendContactMessage">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
const baseUrl = 'http://127.0.0.1/api/'
import axios from 'axios';

export default {
  name: 'ContactView',
  data() {
    return {
      contactMessage: {
        name: '',
        email: '',
        message: '',
      }
    };
  },
  methods: {
    sendContactMessage() {
      axios.post(`${baseUrl}contact`, this.contactMessage)
      .then(
        this.contactMessage = {
          name: '',
          email: '',
          message: '',
        }
      )
      .catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<style></style>
