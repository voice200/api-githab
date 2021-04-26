<template>
<div class="list-pull">
  <div>{{ title }}</div>
  <div class="list-pull_head">
    <div>Name</div>
    <div>Date Create</div>
    <div v-if="!old">Author</div>
    <select @change="useFilter" v-if="old" v-model="useAuthor">
      <option value="author" selected>Author</option>
      <option
               :value="item.author"
               v-for="(item, i) in authors"
               :key="i">
        {{ item.author }}
      </option>
    </select>
    <div v-if="old">Days Open</div>
    <div>Go to githab</div>
  </div>
  <div class="list-pull_item"
  v-for="(pull, i) in !filter ? getPull : getPullWithAuthor(useAuthor)"
  :key="i">
    <div>{{ pull.title }}</div>
    <div>{{ formatDatePull(pull.created_at) }}</div>
    <div>{{ pull.user.login }}</div>
    <div v-if="old">{{ formatDay(pull.created_at) }}</div>
    <a :href="pull.html_url" target="_blank">Go to githab</a>
  </div>
  <PaginationBlock :pages="getPages" :changePage="changePage" v-if="!filter"/>

</div>
</template>

<script>
import { formatDate, unique } from "@/utils/utils";
import PaginationBlock from "@/components/PaginationBlock";
export default {
  components: { PaginationBlock },
  props: {
    title: {
      type: String
    },
    pulls: {
      type: Array
    },
    old:{
      type: Boolean
    }
  },
  name: "listPulls",
  data () {
    return {
      pagination:{
        elementsItem: 25,
        startPage: 1,
        endPage: 0,
        currentPage: 1,
      },
      authors: [],
      filter: false,
      useAuthor: 'author'
    }
  },
  computed: {
    formatDatePull(){
      return date =>{
        return formatDate(date, 'Ru-ru')
      }
    },
    getPages () {
      return Math.ceil(this.pulls.length / this.pagination.elementsItem)
    },
    getPull (){
      return this.pulls.slice((this.pagination.currentPage - 1) * this.pagination.elementsItem, this.pagination.currentPage * this.pagination.elementsItem)
    },
    getPullWithAuthor() {
      return value =>{
        return this.pulls.filter(item => item.user.login === value)
      }
    },
    prepareAuthorsList (){
      return unique(this.pulls.map(item => ({author: item.user.login})))
    }

  },
  methods:{
    formatDay(value){
     const day = (new Date() - new Date(value))/8.64e+7
      if ( day < 1 ){
        return 1
      } else {
        return day.toFixed(0)
      }
    },
    useFilter(){
      if ( this.useAuthor === 'author' ){
        this.filter = false
      } else this.filter = true
    },
    changePage(value){
      if ( value === 'next' ){
        if ( this.pagination.currentPage === this.pagination.endPage ){
          this.pagination.currentPage = this.pagination.endPage
        } else {
          this.pagination.currentPage++
        }
      } else if ( value === 'prev' ){
        if ( this.pagination.currentPage === this.pagination.startPage ){
          this.pagination.currentPage = this.pagination.endPage
        }else {
          this.pagination.currentPage--
        }
      }else {
        this.pagination.currentPage = value
      }
    }
  },
  updated() {
    this.pagination.endPage = this.getPages
    this.authors = this.prepareAuthorsList
    console.log('this.authors', this.authors)
  }
};
</script>

<style scoped lang="scss">
.list-pull{
  &_item{
    display: flex;
    justify-content: space-between;
  }
  &_head{
   display: flex;
    justify-content: space-between;
  }
}
</style>
