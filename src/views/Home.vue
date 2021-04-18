<template>
  <div>
    <FormLogin/>
  </div>
</template>

<script>
// import { getToken, getUser} from "@/request";

import FormLogin from "@/components/FormLogin";
export default {
  name: 'Home',
  components: { FormLogin },
  data () {
    return {
    }
  },
  created() {
    if ( !localStorage.getItem('access_token') ){
      this.$store.dispatch('setStateUrl', this.$route.query.state ?? null)
      this.$store.dispatch('setCode', this.$route.query.code ?? null)
      this.$store.dispatch('loginFromGithub').then(()=>{
        const user = this.$store.getters.getUserLocal
        if (user){
          this.$router.push(`/user/${ user?.id }`)
        }
      })
    }
  }
}
</script>

<style scoped></style>
