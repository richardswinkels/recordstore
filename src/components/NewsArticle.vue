<template>
  <div class="py-5">
    <div class="flex flex-col md:flex-row items-center">
      <div class="w-full md:w-1/3 mb-4 md:mb-0 mr-0 md:mr-4 aspect-w-4 aspect-h-3 ">
        <img :src="newsArticle.image || require('@/assets/placeholder.jpg')" :alt="newsArticle.title"
            class="object-cover w-full h-full">
      </div>
      <div class="w-full md:w-2/3">
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