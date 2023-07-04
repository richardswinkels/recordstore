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
      <p class="text-3xl font-bold">Article not found</p>
    </div>
    <div v-else-if="newsArticle !== null">
      <h2 class="text-redpink font-bold text-3xl mb-4">{{ newsArticle.title }}</h2>
      <div class="flex flex-wrap">
        <div class="w-full">
          <img :src="newsArticle.image || require('@/assets/placeholder.jpg')" alt="Article Image"
            class="float-left mr-4 mb-4 aspect-w-4 aspect-h-3" />
          <div v-html="newsArticle.content" class="w-full content-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = 'https://recordstoreapi.richardswinkels.nl/api/'
import axios from 'axios';
import { useHead } from 'unhead';

export default {
  name: 'NewsArticleView',
  setup() {
    useHead({
      title: 'VinylVibes - News Article',
    });
  },
  data() {
    return {
      newsArticle: null,
      isLoading: true,
      error: false
    };
  },
  mounted() {
    this.fetchArticle();
  },
  computed: {
    ldJson() {
      let ldJson = null;

      if (this.newsArticle) {
        ldJson = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://recordstore.richardswinkels.nl/${this.newsArticle.id}`
          },
          "headline": this.newsArticle.title,
          "image": this.newsArticle.image,
          "author": {
            "@type": "Person",
            "name": this.newsArticle.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "VinylVibes",
            "logo": {
              "@type": "ImageObject",
              "url": "https://recordstore.richardswinkels.nl/img/1536281106.744ccedf.svg"
            }
          },
          "datePublished": ""
        });
      }
      return ldJson;
    }
  },
  methods: {
    fetchArticle() {
      const articleId = this.$route.params.id;

      axios.get(`${baseUrl}news/${articleId}`)
        .then(response => {
          this.newsArticle = response.data;
          this.isLoading = false;
          useHead({
            title: `VinylVibes - ${this.newsArticle.title}`,
            meta: [
              {
                name: 'description',
                content: `Read '${this.newsArticle.title}' on VinylVibes! Explore classic albums, new releases, and rare gems from every genre imaginable. Start your musical journey today!`,
              },
            ]
          });
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
          this.error = true;
        });
    }
  }
}
</script>

<style>
.content-container>p {
  @apply mb-6;
}

.content-container>h2 {
  @apply mb-2 font-bold text-lg;
}
</style>
