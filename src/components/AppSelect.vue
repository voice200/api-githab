<template>
  <div class="app-select">
    <div class="title">Choose Branch:</div>
    <select
      class="select"
      :disabled="!getDisable"
      v-model="branch"
      @change="changeBranch(branch)"
    >
      <option selected v-if="!getDisable">{{ defaultValue }}</option>
      <option
        :selected="item.name === 'master'"
        :value="item.name"
        v-for="(item, i) in items"
        :key="i"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { handlerEvent } from '@/handlerEvent'
export default {
  props: {
    items: { type: Array },
    defaultValue: { type: String }
  },
  data() {
    return {
      branch: 'master'
    }
  },
  methods: {
    changeBranch(branch) {
      this.$store.dispatch('setSearch', { branch }).then(()=>{
        this.$store.dispatch('setPulls')
        this.$store.dispatch('setCommits')
      })
      handlerEvent.$emit('choicedone')
    }
  },
  computed: {
    getDisable() {
      return this.items.length
    }
  }
}
</script>

<style scoped lang="scss">
.app-select{
  display: flex;
  margin-top: 30px;
  align-items: center;
  margin-bottom: 50px;
  .select{
    width: 400px;
    height: 40px;
    font-size: 20px;
  }
  .title{
    font-size: 20px;
    margin-right: 30px;
  }
}

</style>
