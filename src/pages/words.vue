<template>
  <div id="words">
    <header>
      <div class="sequence">{{itemIndex+1}}/{{wordList.length}}</div>
      <div class="mark" @click="markWord()">
        <favor :marked="wordList[itemIndex].isMarked"/>
      </div>
    </header>
    <div class="list swiper-container">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <ul class="swiper-wrapper">
        <li v-for="(word) in wordList"
            :key="word._id"
            class="swiper-slide"
            >
          <p class="word">{{word.word}}</p>
          <p class="spelling">
            <span>英：</span>{{word.spelling['英']}}
            <span class="icon icon-sound" @click="spell(word.word, 'uk', $event)"></span>
          </p>
          <p class="spelling">
            <span>美：</span>{{word.spelling['美']}}
            <span class="icon icon-sound" @click="spell(word.word, 'en', $event)"></span>
          </p>
          <p class="explanation">
            <span v-for="(explanation, index) in word.explanation" :key="index">
              {{explanation}}
            </span>
          </p>
          <p class="sentences">
            {{word.sentences[0].en}}
          </p>
          <p class="sentences">
            {{word.sentences[0].zh}}
          </p>
        </li>
      </ul>
    </div>
    <audio id="dictVoice" style="display: none" src=""></audio>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import favor from '../components/favor';
  import Swiper from 'swiper';

  export default {
    data() {
      return {
        itemIndex: 0//当前第几个
      };
    },
    components: {
      favor
    },
    created() {
    },
    mounted() {
      let vm = this;
      let wordSwiper = new Swiper('.swiper-container',{
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChangeTransitionEnd: function(){
            vm.itemIndex = this.activeIndex;//切换结束时，告诉我现在是第几个slide
          },
        },
      })
    },
    computed: {
      ...mapState(['wordList'])
    },
    methods: {
      spell(word, type, event) {
        event.target.classList.add('active');
        let voice = document.getElementById('dictVoice');
        voice.pause();
        voice.src = '//fanyi.baidu.com/gettts?lan=' + type + '&text=' + word + '&spd=3&source=web';
        voice.play();
        voice.onended = function () {
          event.target.classList.remove('active');
          voice.onended = null;
        };
      },
      markWord() {
        console.log('favor clicked');
        let vm = this;
        this.$store.dispatch('markWord', this.itemIndex).then(function (isMarked) {
          console.log("marked");
        });
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "../assets/mixin";

  #words {
    text-align: center;
    height: 100%;
  }

  .word {
    font-size: 1.5rem;
    font-weight: bold;
  }

  header {
    position: relative;
    @include wh(100%, 1.9rem);
    padding: 0.2rem 0;
    background: $blue;
    .sequence {
      @include abs(0.2em, auto, auto, 5px);
      @include sc(1.5rem, #fff)
    }
    .mark {
      @include abs(0.2rem, 5px, auto, auto);
      z-index: 10;
    }
  }
  .list {
    font-size: 1.2rem;
    height: calc(100% - 2.3rem);
  }
  ul {
    min-height: 500px;
  }

  ul li {
  }
  .icon {
    display: inline-block;
    cursor: pointer;
  }

  .icon-sound {
    background-image: url(../assets/icons.png);
    background-position: 0 -570px;
    @include wh(22px, 19px);
    vertical-align: middle;
    background-size: 34px auto;
  }

  .icon-sound.active {
    background-image: url(../assets/spelling.gif);
    width: 22px;
    background-position: 0 -3px;
    background-size: 22px 22px;
  }

  p {
    margin: 1rem auto;
    padding: 0 0.5rem;
    line-height: 1.5;
  }

  .sentences {
    line-height: 2rem;
  }
.swiper-button-prev,.swiper-button-next{
  top: 1rem;
  @include wh(1.5rem,1.5rem);
  margin-top: 0;
  background-size: 100% 100%;
}
</style>
