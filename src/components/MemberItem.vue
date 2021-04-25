<template>
<!--  <div class="member-item"-->
<!--  v-for="(item, i) of prepareCommits('active')" :key="i">-->
<!--    <div>{{ item }}</div>-->
<!--  </div>-->
  <div></div>
</template>

<script>
export default {
  name: 'MemberItem',
  props:{
    members:{
      type:Array
    }
  },
  data() {
    return {
      branch: ''
    }
  },
  methods:{

  },
  computed:{
    prepareCommits(){
      return value =>{
        if(value === 'active'){
          const author = new Map(this.members.map(item => item.commit.author))
          console.log('author', author)
          return {
            value
          }
        }
      }
    }
  },
  updated() {
    console.log('this.prepareCommits(\'active\')',this.prepareCommits('active'))
  }
}
</script>

<style scoped lang="scss">
.member-item{
  display: flex;
}
</style>
