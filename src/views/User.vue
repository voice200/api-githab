<template>
  <div class="user">
    <Workflow />
  </div>
</template>
<script>
import Workflow from '@/components/Workflow'
export default {
  name: 'User',
  components: { Workflow }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 1199px) {
  .user {
    //width: 100%;
    height: 100%;
    margin: 0;
    padding: 50px;
  }
}
@media screen and (min-width: 1200px) {
  .user {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 600px) {
  .user {
    //width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
