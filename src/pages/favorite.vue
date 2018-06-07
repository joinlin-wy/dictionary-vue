<template>
  <div>
    <header>
      我的收藏
    </header>
    <ul class="list" v-show="!isDetail">
      <li v-for="word in wordList" :key="word.word" @click="showDetail(word)">
        {{word.word}}
      </li>
    </ul>
    <div v-show="isDetail">
      <div class="back" @click="isDetail=false">
        <img :src="back">
      </div>
      <word :word="curWord" v-if="isDetail"></word>
    </div>
  </div>
</template>

<script>
  import word from '../components/word';
  import back from '../assets/back.svg'

  export default {
    components: {
      word
    },
    name: 'favorite',
    data() {
      return {
        wordList: [],
        curWord: {},
        isDetail: false,
        back: back
      };
    },
    created() {
      this.getMarkedWords();
    },
    mounted() {
      document.addEventListener('keydown',(event)=>{
        console.log('from favorite keyDown '+event.keyCode);
        if(event.keyCode === 8 && this.isDetail){
          event.preventDefault();
          this.isDetail = false;
        }
      })
    },
    methods: {
      async getMarkedWords() {
        let data = await this.$store.dispatch('getMarkedWords');
        if (data.status && data.docs.markedWords) {
          this.wordList = data.docs.markedWords.sort((value1, value2) => {
            if (value1 < value2) {
              return 1;
            } else if (value1 > value2) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      },
      showDetail(word) {
        this.$store.dispatch('queryWord', word.word).then((data) => {
          this.curWord = data.docs;
          this.isDetail = true;
        });
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

  .back {
    position: absolute;
    top: 0;
    left: 10px;
    height: 1.9rem;
    padding: 0.2rem 0;
    @include wh(1.9rem, 1.9rem);
  }
  .back:hover{
    cursor: pointer;
  }
</style>
