<template>
  <div class="members">
    <div class="members_filter">
      <div @click="changeFilter('active')">Active </div>
      <div @click="changeFilter('passive')">Passive</div>
    </div>

    <div class="members_head">
      <div>github login</div>
      <div>Number of commits</div>
    </div>
    <div class="members_item"
         v-for="(item, i) of prepareCommits(filter)" :key="i">
      <div>{{ item.author }}</div>
      <div>{{ item.commit }}</div>
    </div>
  </div>
</template>

<script>
import { unique } from '@/utils/utils'

export default {
  name: 'Members',
  components: { },
  data(){
    return {
      filter: 'active'
    }
  },
  computed:{
    getCommits(){
      return this.$store.getters.getCommits
    },
    prepareCommits(){
      return value =>{
        const author = unique(this.getCommits.map(item => ({author: item.commit.author.name})))
        const members = []
        author.forEach(({author}) =>{
          let commit = 1
          let member = {
            author,
            commit: commit
          }
          this.getCommits.forEach(({commit:{author:{name}}}, i)=>{
            if ( name === author ){
              member = {...member, commit: commit++}
              if(i === this.getCommits.length-1){
                members.push(member)
              }
            }
          })
        })
        members.sort((a,b)=>{
          if (a.commit > b.commit) {
            return 1;
          }
          if (a.commit < b.commit) {
            return -1;
          }
          return 0;
        })
        if(value === 'active'){
          return members.reverse().map((item,i)=>{
            if (i <= 31) return item
          })
        }
        else {
          return members.map((item,i)=>{
            if (i <= 31) return item
          })
        }
      }
    }
  },
  methods:{
    changeFilter(value){
      this.filer = value
    }
  }
}
</script>

<style scoped lang="scss">
.members{
  .members_filter{
    display: flex;
    cursor: pointer;
  }
  &_item{
    display: flex;
  }
}
.members_head{
  display: flex;

}
</style>
