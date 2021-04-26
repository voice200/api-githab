<template>
  <div class="autocomplete">
    <label class="autocomplete_label" for="url"
      >Enter the full path to the repository as
      'https://github.com/owner/repository' or in the format “user/repository”
      or “org/repository”:</label
    >
    <input id="url" type="text" v-model="url" @input="checkUrl(url)" />
  </div>
</template>

<script>
export default {
  name: 'InputAutocomplete',
  props: {
    changeDisable: { type: Function }
  },
  data() {
    return {
      url: null,
      link: false,
      request: {
        owner: null,
        repo: null
      },
      regExpLink: /^(https:\/\/github.com\/[\w+\d+\-&.]*\/[\w+\d+\-&.]*)/gmi,
      regExpUrl: /(^[\w+\d+\-&.]*\/+[\w+\d+\-&.]*)+$/gim,
      isValid: false
    }
  },
  methods: {
    checkUrl(url) {
      if (url) {
        const link = this.isLink(url)
          console.log('link', link)
          console.log('this.regExpLink.test(url)', this.regExpLink.test(url))
        console.log('condition',link && this.regExpLink.test(url))
          if ( this.regExpLink.test(url) && link){
            console.log('link захожу')
            const newUrl = url.split('/')
            this.request.repo = newUrl[newUrl.length - 1]
            this.$store.dispatch('setSearch', {
              owner: newUrl[newUrl.length - 2],
              repo: newUrl[newUrl.length - 1]
            })
            this.request.owner = newUrl[newUrl.length - 2]
            this.isValid = true
            this.changeDisable(false)
          }else {
            this.isValid = false
            this.changeDisable(true)
          }
        if (!link && this.checkRegExp) {
          let [owner, repo] = url.split('/')
          this.request.owner = owner
          this.request.repo = repo
          if (repo) {
            this.$store.dispatch('setSearch', {
              owner,
              repo
            })
            this.isValid = true
            this.changeDisable(false)
          }else {
            this.isValid = false
            this.changeDisable(true)
          }
        }
      } else {
        this.isValid = false
        this.changeDisable(true)
      }
    },
    isLink(url) {
      if (url.includes('https')) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    checkRegExp() {
      return (url) => {
        return !!this.regExpUrl.test(url)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.autocomplete {
  display: flex;
  flex-direction: column;
  &_label {
    font-size: 14px;
    margin-bottom: 15px;
  }
  input {
    width: 100%;
    align-self: center;
    height: 30px;
    outline: none;
    font-size: 20px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 20px;

  }
}
</style>
