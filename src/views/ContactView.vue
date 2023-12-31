<template>
  <teleport to="head">
    <component :is="'script'" type="application/ld+json">
      {
      "@context": "https://schema.org",
      "@type": "MusicStore",
      "name": "VinylVibes",
      "image": "https://recordstore.richardswinkels.nl/img/vinylvibes_interior.jpeg",
      "@id": "https://recordstore.richardswinkels.nl/",
      "url": "https://recordstore.richardswinkels.nl/",
      "telephone": "0612345678",
      "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sterrenlaan 10",
      "addressLocality": "Eindhoven",
      "postalCode": "5631KA",
      "addressCountry": "NL"
      },
      "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.46630570000001,
      "longitude": 5.4963976
      },
      "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
      }
      }
    </component>
  </teleport>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">Contact</h2>
    <p class="mb-4">Get in Touch with VinylVibes!
      We're excited to connect with you! Whether you have a question, need assistance, VinylVibes is here to assist.
      Simply fill out the contact form below, and our friendly team will respond promptly.</p>

    <p v-if="errorMessage" class="text-redpink mb-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="mb-2">{{ successMessage }}</p>
    <form>
      <div class="form-row">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="contactMessage.name" required>
        <p class="error" v-for="error of v$.contactMessage.name.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
      <div class="form-row">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="contactMessage.email" required>
        <p class="error" v-for="error of v$.contactMessage.email.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
      <div class="form-row">
        <label for="message">Message:</label>
        <textarea id="message" cols="30" rows="10" v-model="contactMessage.message" required></textarea>
        <p class="error" v-for="error of v$.contactMessage.message.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
      <div class="text-right">
        <button class="button-red" @click.prevent="sendContactMessage">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';
import { useHead } from 'unhead';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: 'ContactView',
  setup() {
    useHead({
      title: 'VinylVibes - Contact',
      meta: [
        {
          name: 'description',
          content: 'Get in touch with VinylVibes and connect with us. Reach out to our team for inquiries, support, or collaborations. We are here to assist you with any questions or feedback you may have.',
        },
      ],
    });
    return { v$: useVuelidate() }
  },
  data() {
    return {
      contactMessage: {
        name: '',
        email: '',
        message: '',
      },
      infoMessage: '',
    };
  },
  methods: {
    async sendContactMessage() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return;

      axios.post(`${baseUrl}contact`, this.contactMessage)
        .then(() => {
          this.contactMessage = {
            name: '',
            email: '',
            message: '',
          };
          this.v$.$reset();
          this.errorMessage = '';
          this.successMessage = 'Message sent successfully!';
        })
        .catch(error => {
          console.error(error);
          this.successMessage = '';
          this.errorMessage = 'An error occurred. Please try again later.';
        });
    }
  },
  validations() {
    return {
      contactMessage: {
        name: { required },
        email: { required, email },
        message: { required, minLength: minLength(3) }
      }
    }
  }
}
</script>

<style></style>
