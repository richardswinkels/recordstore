<template>
  <div class="py-5">
    <div class="flex items-center">
      <div class="w-1/3">
        <div class="aspect-w-4 aspect-h-3 mr-4">
          <img :src="newsArticle.image || require('@/assets/placeholder.jpg')" :alt="newsArticle.title"
            class="object-cover w-full h-full">
        </div>
      </div>
      <div class="w-2/3">
        <h2 class="font-bold text-2xl mb-5">{{ newsArticle.title }}</h2>
        <p>{{ newsArticle.content }}</p>
        <div class="text-right">
          <router-link class="font-bold underline" :to="`/news-article/${newsArticle.id}`">Read further</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsArticle',
  props: {
    newsArticle: {
      type: Object,
      required: true
    }
  },
}
</script>

<style></style>