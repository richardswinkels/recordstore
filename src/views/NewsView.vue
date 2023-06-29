<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <h2 class="text-redpink font-bold text-3xl mb-4">News</h2>
    <div class="divide-y">
      <NewsArticle v-for="newsArticle in newsArticles" :key="newsArticle.id" :newsArticle="newsArticle">
      </NewsArticle>
    </div>
    <PageNavigator :totalPages="totalPages" @changePage="changePage"></PageNavigator>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';
import NewsArticle from '@/components/NewsArticle.vue';
import PageNavigator from '@/components/PageNavigator.vue';

export default {
  name: 'NewsView',
  components: {
    NewsArticle,
    PageNavigator
  },
  data() {
    return {
      newsArticles: [],
      page: 1,
      perPage: 10,
      totalPages: 0,
    };
  },
  mounted() {
    this.fetchNewsArticles();
  },
  methods: {
    fetchNewsArticles() {
      axios.get(`${baseUrl}news`, {
        params: {
          per_page: this.perPage,
          page: this.page,
        }
      })
        .then(response => {
          this.newsArticles = response.data.data;
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
    page() {
      this.fetchNewsArticles();
    }
  }
}
</script>

<style></style>
