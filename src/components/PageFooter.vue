<template>
  <footer class="bg-blackadder">
    <div class="max-w-screen-lg mx-auto h-24 mt-6 flex items-center">
      <p class="text-redpink px-4">Copyright © {{ currentYear }} - <router-link to="/" class="text-redpink font-medium underline">VinylVibes</router-link></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
}
</script>

<style></style>