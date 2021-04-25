<template>
<div class="pagination-block">
  <div @click="changePage('prev')">Prev</div>
  <div class="pagination-block_pages">
    <div v-for="(page, i) in pages" :key="i"
         @click="changePage(page)">{{ page }}</div>
  </div>
  <div @click="changePage('next')">Next</div>
</div>
</template>

<script>
export default {
name: "paginationBlock",
  props:{
    pages: {type: Number},
    changePage:{type: Function}
  }
}
</script>

<style scoped lang="scss">
.pagination-block{
  display: flex;
  cursor: pointer;
}

</style>
