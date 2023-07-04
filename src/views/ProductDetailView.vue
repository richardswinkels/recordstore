<template>
  <teleport to="head">
    <component :is="'script'" type="application/ld+json" v-html="ldJson">

    </component>
  </teleport>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <div v-if="isLoading">
      <p class="text-3xl font-bold">Loading...</p>
    </div>
    <div v-else-if="error">
      <p class="text-3xl font-bold">Product not found</p>
    </div>
    <div v-else-if="product !== null" class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/2">
        <img :src="product.image || require('@/assets/placeholder.jpg')" alt="Product Image" class="w-full h-auto"
          rel="preload">
      </div>
      <div class="w-full md:w-1/2 md:ml-10">
        <h2 class="text-redpink font-bold text-2xl mb-1 mt-2 md:mt-0">{{ product.name }}</h2>
        <p class="font-semibold text-xl mb-1">{{ formatEuro(product.price) }}</p>
        <div class="flex items-center mb-4">
          <button class="button-red transition-all hover:scale-105 mr-4" @click.stop.prevent="addToCart(product)">
            <div class="flex items-center">
              <span class="text-white mr-2">Add to cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" class="text-white"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
          </button>
          <div v-if="showCartMessage" class="font-bold">
            Added to cart
          </div>
        </div>
        <p class="mb-4">
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';
import { useHead } from 'unhead';
import { formatEuro } from '@/helpers';

export default {
  name: 'ProductDetailView',
  setup() {
    useHead({
      title: 'VinylVibes - Product',
    });
  },
  data() {
    return {
      product: null,
      showCartMessage: false,
      isLoading: true,
      error: false
    };
  },
  mounted() {
    this.fetchProduct();
  },
  computed: {
    ldJson() {
      let ldJson = null;

      if (this.product) {
        ldJson = JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": this.product.name,
          "image": this.product.image,
          "offers": {
            "@type": "Offer",
            "url": `https://recordstore.richardswinkels.nl/products/${this.product.id}`,
            "priceCurrency": "EUR",
            "price": this.product.price
          }
        });
      }
      return ldJson;
    }
  },
  methods: {
    formatEuro,
    fetchProduct() {
      const productId = this.$route.params.id;

      axios.get(`${baseUrl}products/${productId}`)
        .then(response => {
          this.product = response.data;
          this.isLoading = false;
          useHead({
            title: `VinylVibes - ${this.product.name}`,
            meta: [
              {
                name: 'description',
                content: `Order '${this.product.name}' now on VinylVibes! Explore classic albums, new releases, and rare gems from every genre imaginable. Start your musical journey today!`,
              },
            ],
          });
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
          this.error = true;
        });
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);

      this.showCartMessage = true;

      setTimeout(() => {
        this.showCartMessage = false;
      }, 1000);
    }
  },
}
</script>

<style></style>
