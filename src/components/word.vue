<template>
  <div class="word-detail">
    <p class="word">{{word.word}}</p>
    <p class="spelling">
      <span>英：</span>{{word.spelling['英']}}
      <span class="icon icon-sound" @click="spell('uk', $event)"></span>
    </p>
    <p class="spelling">
      <span>美：</span>{{word.spelling['美']}}
      <span class="icon icon-sound" @click="spell('en', $event)"></span>
    </p>
    <p class="explanation">
            <span v-for="(explanation, index) in word.explanation" :key="index">
              {{explanation}}
            </span>
    </p>
    <p class="sentences">
      {{word.sentences[0].en}}
      <br>
      {{word.sentences[0].zh}}
    </p>
    <audio :rel="word._id" style="display: none" src=""></audio>
  </div>
</template>

<script>
  export default {
    name: 'word',
    props: {
      word: {
        type: Object
      },
      data() {
        return {};
      },
      methods: {
        spell(type, event) {
          event.target.classList.add('active');
          let voice = this.$refs[this.word._id];
          voice.pause();
          voice.src = '//fanyi.baidu.com/gettts?lan=' + type + '&text=' + this.word.word + '&spd=3&source=web';
          voice.play();
          voice.onended = function () {
            event.target.classList.remove('active');
            voice.onended = null;
          };
        }
      }
    }
  };
</script>

<style scoped>
  .word {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .word-detail{
    font-size: 1.2rem;
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

</style>
