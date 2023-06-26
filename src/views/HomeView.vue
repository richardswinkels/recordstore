<template>
  <div class="divide-y">
    <div>
      <div class="max-w-screen-lg mx-auto px-4 mb-8 flex flex-col-reverse md:flex-row items-center">
        <div class="text-center md:text-left w-full md:w-1/2">
          <h2 class="text-redpink font-bold text-4xl mb-3">Welcome to VinylVibes!</h2>
          <p class="mb-5">Discover the timeless charm of vinyl records at VinylVibes, your ultimate online destination for music enthusiasts and collectors alike. Immerse yourself in the rich sounds and nostalgic vibes of classic albums, new releases, and rare gems from every genre imaginable. Whether you're a seasoned vinyl connoisseur or just starting your musical journey, we have something special waiting for you.</p>
          <router-link to="/store">
            <button class="button-red transition-all hover:scale-105 text-2xl">Shop now!</button>
          </router-link>
        </div>
        <div class="w-full md:w-1/2 mb-4 md:mb-0">
          <img :src="require('@/assets/1536281106.svg')" class="mx-auto">
        </div>
      </div>
    </div>
    <div>
      <div class="max-w-screen-lg mx-auto px-4 mt-4">
        <h2 class="text-redpink font-bold text-2xl mb-5">Featured products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard v-for="product in products" :key="product.id" :product="product">
            </ProductCard>
          <div v-if="products.length === 0">
            <p>No products available.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = 'http://127.0.0.1/api/'
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'HomeView',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get(`${baseUrl}products`, {
        params: {
          'per_page': 4,
        }
      })
        .then(response => {
          this.products = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style></style>
