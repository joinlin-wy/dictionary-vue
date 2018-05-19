<template>
  <div>
    <header>
      我的收藏
    </header>
  <ul class="list">
    <li v-for="word in wordList" :key="word.word">
      {{word.word}}
    </li>
  </ul>
  </div>
</template>

<script>
  export default {
    name: 'favorite',
    data() {
      return {
        wordList: [],
        itemIndex: 0
      };
    },
    created() {
      this.getMarkedWords();
    },
    methods: {
      async getMarkedWords() {
        let data = await this.$store.dispatch('getMarkedWords');
        if (data.status) {
          this.wordList = data.docs.markedWords;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/mixin";

  header {
    height: 1.9rem;
    padding: 0.2rem 0;
    background: $blue;
    @include sc(1.5rem, #fff)
  }
</style>
