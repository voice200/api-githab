<template>
<div>
  <select @change="changeBranch('test')"  :disabled="!getDisable">
<!--    <option selected>{{ defaultValue }}</option>-->
    <option
      @change="changeBranch(item.name)"
      :selected="item.name === 'master'"
      v-for="(item, i) in items"
            :key="i">{{ item.name }}</option>
  </select>
</div>
</template>

<script>
export default {
  props: {
    items: {type: Array},
    defaultValue: {type: String},
    data () {
      return {
        branch: null
      }
    }
  },
name: "AppSelect",
  data () {
    return {
    }
  },
  methods: {
    changeBranch(branch){
      this.$store.dispatch('setSearch', {branch})
      console.log('меняю ветку')
    }
  },
  computed : {
    // getBranches () {
    //   return this.items.filter(item => item.name !== 'master')
    // },
    getDisable() {
      return this.items.length
    }
  }
}
</script>

<style scoped lang="scss">

</style>
