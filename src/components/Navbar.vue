<template>
<div class="navbar">
  <div class="navbar_label">GitHub Analytic-api</div>
  <div class="navbar_user-data" v-if="getUserLocal">
    <div class="navbar_user navbar_user__position">
      <div class="navbar_login navbar_login__position">{{ getUserLocal.login }}</div>
      <img class="navbar_avatar" :src="getUserLocal.avatar" alt="avatar" v-if="getUserLocal.avatar">
    </div>
    <div class="navbar_button" @click="logOut">LogOut</div>
  </div>

</div>
</template>

<script>
export default {
name: "Navbar",
  computed: {
  getUserLocal () {
    return this.$store.getters.getUserLocal
  }
  },
  methods: {
  logOut () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('state')
    localStorage.removeItem('code_client')
    this.$store.dispatch('deleteUser')
    this.$router.push('/')
  }
  }
}
</script>

<style scoped lang="scss">
.navbar{
  width: 100%;
  height: 80px;
  background: rgb(5, 25, 45);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  font-size: 20px;
  box-sizing: border-box;

  //&_label{
  //  cursor: pointer;
  //}
  &_button{
    cursor: pointer;
    &:hover{
      color: #d2cfcf;
    }
  }
  &_user-data{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &_user{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    &__position{
      margin-right: 20px;
    }
  }
  &_login{
    &__position{
      margin-right: 10px;
    }
  }

  &_avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-position: center;
    object-fit: contain;

  }
}

</style>
