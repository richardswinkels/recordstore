<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <PageFooter></PageFooter>
</template>

<script>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  name: 'App',
  components: {
    RouterView,
    NavBar,
    PageFooter,
  }
}
</script>

<style>

</style>
