<template>
  <nav>
    <div class="max-w-screen-lg mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Name -->
        <div class="flex flex-1 items-center">
          <button class="pr-4 md:hidden" @click="toggleMobileNav" aria-label="Toggle mobile navigation">
            <svg v-if="!showMobileNav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <router-link to="/">
            <h1 class="text-4xl text-redpink font-lobster">VinylVibes</h1>
          </router-link>
        </div>

        <!-- Navlinks -->
        <div class="md:flex flex-1 items-center justify-center hidden">
          <router-link to="/" class="px-3 py-2 font-semibold">Home</router-link>
          <router-link to="/store" class="px-3 py-2 font-semibold">Store</router-link>
          <router-link to="/news" class="px-3 py-2 font-semibold">News</router-link>
          <router-link to="/contact" class="px-3 py-2 font-semibold">Contact</router-link>
        </div>

        <!-- Cart Button -->
        <div class="flex flex-1 items-center justify-end">
          <router-link to="/cart">
            <button aria-label="Go to shopping cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div id="mobile-navlinks" class="md:hidden">
      <!-- Hamburger Menu -->
      <div v-if="showMobileNav">
        <div class="flex flex-col justify-center">
          <router-link to="/" class="px-5 py-2 font-semibold ">Home</router-link>
          <router-link to="/store" class="px-5 py-2 font-semibold">Store</router-link>
          <router-link to="/news" class="px-5 py-2 font-semibold">News</router-link>
          <router-link to="/contact" class="px-5 py-2 font-semibold">Contact</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      showMobileNav: false
    };
  },
  methods: {
    toggleMobileNav() {
      this.showMobileNav = !this.showMobileNav;
    }
  }
}
</script>

<style>
.router-link-active {@apply text-gray-600;}
</style>