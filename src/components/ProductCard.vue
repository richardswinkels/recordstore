<template>
  <router-link :to="`/products/${product.id}`"
    class="flex flex-col bg-redpink rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105">
    <img 
      :src="product.image || require('@/assets/placeholder.jpg')" 
      :alt="product.name" 
      class="w-full aspect-[4/3] object-cover">
    <div class="p-4 flex flex-grow flex-col justify-between">
      <div>
        <h3 class="text-medium text-white font-bold">{{ product.name }}</h3>
        <p class="text-gray-200">{{ product.description }}</p>
      </div>
      <div v-if="showCartMessage" class="text-white text-right font-bold">
        Added to cart
      </div>
      <div class="flex justify-between items-end mt-2">
        <span class="text-white font-bold">{{ formatEuro(product.price) }}</span>
        <button @click.stop.prevent="addToCart(product)" class="transition-all transform hover:scale-120" aria-label="Add to shopping cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" class="text-white"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
import { formatEuro } from '@/helpers';

export default {
  name: 'ProductCard',
  data() {
    return {
      showCartMessage: false
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatEuro,
    addToCart(product) {
      this.$store.dispatch('addToCart', product);

      this.showCartMessage = true;

      setTimeout(() => {
        this.showCartMessage = false;
      }, 1000);
    }
  }
}
</script>

<style></style>