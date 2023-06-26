<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">Place your order</h2>
    <p class="mb-4">
      We are excited to fulfill your order and ensure a seamless delivery process. To expedite this process, we kindly request that you provide us with your shipping details by filling out the form below.
    </p>
    <form>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 mr-2">
          <div class="form-row">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="shippingDetails.name" required>
          </div>
          <div class="form-row">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="shippingDetails.email" required>
          </div>
          <div class="form-row">
            <label for="phone">Phone:</label>
            <input type="text" id="phone" v-model="shippingDetails.phone" required>
          </div>
        </div>
        <div class="w-full md:w-1/2 md:ml-2">
          <div class="form-row">
            <label for="address">Address:</label>
            <input type="text" id="address" v-model="shippingDetails.address" required>
          </div>
          <div class="form-row">
            <label for="city">City:</label>
            <input type="text" id="email" v-model="shippingDetails.city" required>
          </div>
          <div class="form-row">
            <label for="zipcode">Zipcode:</label>
            <input type="text" id="zipcode" v-model="shippingDetails.zipcode" required>
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
const baseUrl = 'http://127.0.0.1/api/'
import axios from 'axios';

export default {
  name: 'OrderView',
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
  methods: {
    placeOrder() {
      const orderData = {
        items: this.$store.state.cart,
        shippingDetails: this.shippingDetails
      };

      axios.post(`${baseUrl}orders`, orderData)
      .then(() => {
        this.shippingDetails = {};
        this.clearCart();
      })
      .catch(error => {
        console.error(error);
      });
    },
    clearCart() {
      this.$store.dispatch('clearCart');
    }
  }
}
</script>

<style></style>
