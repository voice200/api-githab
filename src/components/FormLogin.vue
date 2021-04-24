<template>
  <div class="form-login form-login__position">
    <div class="form-login_title">
      To use the application, you need to log in through Github
    </div>
    <img class="form-login_img" :src="gitHubImg" alt="gitHubImg" />

    <div class="form-login_button" @click="loginGitHub">Authorization</div>
  </div>
</template>

<script>
import { getAuth } from '@/request'

export default {
  name: 'FormLogin',
  data() {
    return {
      gitHubImg:
        'https://www.pngkey.com/png/full/178-1787134_png-file-svg-github-icon-png.png'
    }
  },
  methods: {
    loginGitHub() {
      getAuth()
    }
  }
}
</script>

<style scoped lang="scss">
.form-login {
  width: 800px;
  height: 600px;
  background: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  &__position {
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
  }
  &_title {
  }
  &_img {
    width: 50%;
    object-fit: contain;
    object-position: center;
  }
  &_button {
    width: 200px;
    height: 50px;
    background: #fcce0d;
    color: black;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    font-weight: 800;
    border-radius: 10px;
    align-self: center;
    cursor: pointer;
    &:hover {
      background: #e9ba13;
    }
  }
}
@media screen and (max-width: 1023px) {
  .form-login {
    width: 100%;
    height: 100%;
  }
}
@media screen and (min-width: 1024px) {
  .form-login {
    width: 800px;
    height: 600px;
  }
}
</style>
