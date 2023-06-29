<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">Store</h2>
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/4 md:mr-8 mb-8">
        <div class="mb-6">
          <span class="font-semibold">Genre</span>
          <Multiselect v-model="filters.genres" mode="tags" :options="genres" />
        </div>
        <div class="mb-6">
          <span class="font-semibold">Categorie</span>
          <Multiselect v-model="filters.categories" mode="tags" :options="categories" />
        </div>
        <div>
          <span class="font-semibold">Prijs</span>
          <Slider :min="0" :max="500" v-model="filters.priceRange"></Slider>
        </div>
      </div>
      <div class="w-full md:w-3/4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <ProductCard v-for="product in products" :key="product.id" :product="product">
            </ProductCard>
            <div v-if="products.length === 0">
              <p>No products available.</p>
          </div>
        </div>
        <PageNavigator :totalPages="totalPages" @changePage="changePage"></PageNavigator>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';
import Slider from '@vueform/slider';
import ProductCard from '@/components/ProductCard.vue';
import Multiselect from '@vueform/multiselect';
import PageNavigator from '@/components/PageNavigator.vue';

export default {
  name: 'StoreView',
  components: {
    PageNavigator,
    ProductCard,
    Multiselect,
    Slider
  },
  data() {
    return {
      filters: {
        'genres': [],
        'categories': [],
        'priceRange': [0, 500],
      },
      genres: [],
      categories: [],
      products: [],
      page: 1,
      perPage: 40,
      totalPages: 0,
    };
  },
  mounted() {
    this.fetchGenres();
    this.fetchCategories();
    this.fetchProducts();
  },
  methods: {
    fetchGenres() {
      axios.get(`${baseUrl}genres`)
        .then(response => {
          const responseData = response.data;
          this.genres = responseData.map(genre => {
            return {
              value: genre.id,
              label: genre.name
            };
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchCategories() {
      axios.get(`${baseUrl}categories`)
        .then(response => {
          const responseData = response.data;
          this.categories = responseData.map(category => {
            return {
              value: category.id,
              label: category.name
            };
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchProducts() {
      axios.get(`${baseUrl}products`, {
        params: {
          categories: this.filters.categories,
          genres: this.filters.genres,
          min_price: this.filters.priceRange[0],
          max_price: this.filters.priceRange[1],
          per_page: this.perPage,
          page: this.page,
        }
      })
        .then(response => {
          this.products = response.data.data;
          this.totalPages = response.data.last_page;
        })
        .catch(error => {
          console.error(error);
        });
    },
    changePage(page) {
      this.page = page;
    }
  },
  watch: {
    filters: {
      handler() {
        this.fetchProducts();
      },
      deep: true
    },
    page() {
      this.fetchProducts();
    }
  }
}
</script>

<style></style>
