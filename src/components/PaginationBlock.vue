<template>
  <div class="pagination-block">
    <div @click="changePage('prev')">Prev</div>
    <div class="pagination-block_pages">
      <div
        v-for="(page, i) in pages"
        :key="i"
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
    </div>
    <div @click="changePage('next')">Next</div>
  </div>
</template>

<script>
export default {
  name: 'paginationBlock',
  props: {
    pages: { type: Number },
    changePage: { type: Function },
    currentPage: { type: Number }
  }
}
</script>

<style scoped lang="scss">
.pagination-block {
  margin-top: 30px;
  display: flex;
  div {
    cursor: pointer;
    margin-right: 15px;
    &:hover {
      color: #ff5400;
    }
  }
  .active {
    color: #ff5400;
  }
}
</style>
