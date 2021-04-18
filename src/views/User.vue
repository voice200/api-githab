<template>
  <div class="user">
  </div>
</template>
<script>
export default {
name: "User"
}
</script>

<style scoped lang="scss">
.user{
  background: gray;
}
@media screen and (max-width: 1023px) {
  .user{
    width: 100%;
    height: 100%;
    margin: 0;
  }
}
@media screen and (min-width: 1024px) {
  .user{
    width: 1024px;
    height: 100%;
    margin: 0 auto;
  }
}

</style>
