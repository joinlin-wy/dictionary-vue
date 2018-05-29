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
    computed: {},
    methods: {
      async getMarkedWords() {
        let data = await this.$store.dispatch('getMarkedWords');
        if (data.status) {
          this.wordList = data.docs.markedWords.sort((value1, value2) => {
            if (value1 < value2) {
              return 1;
            } else if (value1 > value2) {
              return -1;
            }else{
              return 0;
            }
          });
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

  ul li {
    font-size: 1.5rem;
    @include wh(100%);
    line-height: 2;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
</style>
