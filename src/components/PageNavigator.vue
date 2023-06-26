<template>
  <div>
    <button class="bg-redpink hover:bg-rose-400 text-white font-bold py-2 px-4 rounded-l" v-if="currentPage > 1"
      @click="previousPage">
      &lt;
    </button>
    <ul class="inline-flex">
      <li v-for="pageNumber in displayedPages" :key="pageNumber">
        <button class="bg-redpink hover:bg-rose-400 text-white font-bold py-2 px-4"
          :class="{ 'bg-rose-400': pageNumber === currentPage }" @click="goToPage(pageNumber)">
          {{ pageNumber }}
        </button>
      </li>
    </ul>
    <button class="bg-redpink hover:bg-rose-400 text-white font-bold py-2 px-4 rounded-r" v-if="currentPage < totalPages"
      @click="nextPage">
      &gt;
    </button>
  </div>
</template>
  
<script>
export default {
  name: 'PageNavigator',
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    displayedPages() {
      const windowSize = 5;
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;

      const halfWindowSize = Math.floor(windowSize / 2);
      let startPage = Math.max(1, currentPage - halfWindowSize);
      let endPage = Math.min(startPage + windowSize - 1, totalPages);

      if (endPage - startPage + 1 < windowSize) {
        startPage = Math.max(1, endPage - windowSize + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.emitPageChange();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.emitPageChange();
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.emitPageChange();
    },
    emitPageChange() {
      this.$emit('changePage', this.currentPage);
    }
  }
}
</script>
  
<style></style>