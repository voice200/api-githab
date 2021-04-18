<template>
<div class="workflow_container">
  <InputAutocomplete :changeDisable="changeDisable"/>
  <button class="workflow_button" @click="getData">Use It</button>
  <AppSelect :items="getBranches" defaultValue="master"/>
</div>
</template>

<script>
import InputAutocomplete from "@/components/InputAutocomplete";
import AppSelect from "@/components/AppSelect";

export default {
name: "workflow",
  components: { AppSelect, InputAutocomplete },
  data () {
  return {
    disable: false
  }
  },
  computed: {
    getBranches(){
      return this.$store.getters.getBranches
    }
  },
  methods: {
    changeDisable (value) {
      this.disable = value
      console.log('disable', this.disable)
    },
    getData () {
      this.$store.dispatch('setRepository').then(()=>{
        this.$store.dispatch('setBranches')
      })
    }
  }
}
</script>


<style scoped lang="scss">
.workflow{
  &_container{

  }
  &_button{
    width: 200px;
  }
}

</style>
