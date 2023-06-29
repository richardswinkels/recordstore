<template>
  <div class="max-w-screen-lg mx-auto px-4 mt-6">
    <div v-if="newsArticle !== null">
      <h2 class="text-redpink font-bold text-3xl mb-4">{{ newsArticle.title }}</h2>
      <div class="flex flex-wrap">
      <div class="w-full">
        <img :src="newsArticle.image || require('@/assets/placeholder.jpg')" alt="Article Image" class="float-left mr-4 mb-4 aspect-w-4 aspect-h-3" />
        <p class="w-full">{{ newsArticle.content }}</p>
      </div>
    </div>
    </div>
    <div v-else>
      <p class="text-3xl font-bold">Article not found</p>
    </div>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';

export default {
  name: 'NewsArticleView',
  data() {
    return {
      newsArticle: null,
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    fetchArticle() {
      const articleId = this.$route.params.id;

      axios.get(`${baseUrl}news/${articleId}`)
        .then(response => {
          this.newsArticle = response.data;
          document.title = `VinylVibes - ${this.newsArticle.title}`;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style></style>
