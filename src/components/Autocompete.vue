<template>
<div class="autocomplete">
  <div @click="chooseValue(item)" class="autocomplete_item"
  v-for="(item, i) of items" :key="i">
    {{ item }}
  </div>

</div>
</template>

<script>
export default {
  props:{
    items:{
      type: Array
    },
    chooseValue:{type:Function}
  },
name: "Autocompete",
}
</script>

<style scoped lang="scss">
.autocomplete{
  width: 300px;
  background: white;
  min-height: 100px;
  max-height: 260px;
  margin-top: 63px;
  position: absolute;
  z-index: 100;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  &_item{
      padding: 5px 15px;
      &:hover{
        background: rgba(0,0,0, .1);
        cursor: pointer;
      }
  }
  .loading{
    align-self: center;
    margin-top: 10%;
  }
}

</style>
