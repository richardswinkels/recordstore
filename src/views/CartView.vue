<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">Cart</h2>
    <div v-if="this.cart.length > 0" class="w-full">
      <div class="overflow-x-auto">
        <table>
          <tr>
            <th class="text-left" colspan="2">Product</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price</th>
            <th class="text-left">Subtotal</th>
            <th></th>
          </tr>
          <CartItem v-for="product in cart" :product="product" :key="product.id" @updateQuantity="updateQuantity"
            @deleteCartItem="deleteCartItem"></CartItem>
        </table>
      </div>
      <div class="text-right">
        <router-link to="/order"><button class="button-red">Order</button></router-link>
      </div>
    </div>
    <div v-else>
      <p class>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useHead } from 'unhead';
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'CartView',
  setup() {
    useHead({
      title: 'VinylVibes - Cart',
    });
  },
  components: {
    CartItem,
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  methods: {
    updateQuantity(product) {
      this.$store.dispatch('updateQuantity', product);
    },
    deleteCartItem(product) {
      this.$store.dispatch('removeFromCart', product);
    }
  }
}
</script>

<style></style>
