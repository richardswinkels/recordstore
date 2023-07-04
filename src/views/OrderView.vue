<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">Place your order</h2>
    <p class="mb-4">
      We are excited to fulfill your order and ensure a seamless delivery process. To expedite this process, we kindly
      request that you provide us with your shipping details by filling out the form below.
    </p>
    <p v-if="errorMessage" class="text-redpink mb-2">{{ errorMessage }}</p>
    <form>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 mr-2">
          <div class="form-row">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="shippingDetails.name" required>
            <p class="error" v-for="error of v$.shippingDetails.name.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
          <div class="form-row">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="shippingDetails.email" required>
            <p class="error" v-for="error of v$.shippingDetails.email.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
          <div class="form-row">
            <label for="phone">Phone:</label>
            <input type="text" id="phone" v-model="shippingDetails.phone" required>
            <p class="error" v-for="error of v$.shippingDetails.phone.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 md:ml-2">
          <div class="form-row">
            <label for="address">Address:</label>
            <input type="text" id="address" v-model="shippingDetails.address" required>
            <p class="error" v-for="error of v$.shippingDetails.address.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
          <div class="form-row">
            <label for="city">City:</label>
            <input type="text" id="email" v-model="shippingDetails.city" required>
            <p class="error" v-for="error of v$.shippingDetails.city.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
          <div class="form-row">
            <label for="zipcode">Zipcode:</label>
            <input type="text" id="zipcode" v-model="shippingDetails.zipcode" required>
            <p class="error" v-for="error of v$.shippingDetails.zipcode.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
      <div class="text-right">
        <button class="button-red" @click.prevent="placeOrder">Place order</button>
      </div>
    </form>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';
import { useHead } from 'unhead';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'OrderView',
  setup() {
    useHead({
      title: 'VinylVibes - Place order',
    });
    return { v$: useVuelidate() }
  },
  mounted() {
    if (this.cart.length <= 0) {
      this.$router.push('/');
    }
  },  
  data() {
    return {
      shippingDetails: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipcode: ''
      }
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  methods: {
    async placeOrder() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return;

      const orderData = {
        items: this.cart,
        shippingDetails: this.shippingDetails,
        errorMessage: ''
      };

      axios.post(`${baseUrl}orders`, orderData)
        .then(() => {
          this.shippingDetails = {};
          this.v$.$reset();
          this.clearCart();
          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'An error occurred while placing order. Please try again later.';
        });
    },
    clearCart() {
      this.$store.dispatch('clearCart');
    }
  },
  validations() {
    return {
      shippingDetails: {
        name: { required },
        email: { required, email },
        phone: { required },
        address: { required },
        city: { required },
        zipcode: { required }
      }
    }
  }
}
</script>

<style></style>
