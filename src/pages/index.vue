<template>
  <section class="body">
    <transition name="bounce" v-if="showWelcome">
      <welcome></welcome>
    </transition>
    <div v-else style="height: 100%;">
      <div class="view">
        <favorite v-show="view==='Favorite'"></favorite>
        <words v-show="view==='Words'"></words>
        <more v-show="view==='More'"></more>
        <setting v-show="view==='Setting'"></setting>
      </div>
      <footer>
        <div class="favorite" :class="{active:view==='Favorite'}" @click="changeAndUpdateFavor">收藏</div>
        <div class="words" :class="{active:view==='Words'}" @click="view='Words'">单词</div>
        <div class="more" :class="{active:view==='More'}" @click="view='More'">更多</div>
        <div class="setting" :class="{active:view==='Setting'}" @click="view='Setting'">设置</div>
      </footer>
    </div>
    <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="closeTip"/>
  </section>
</template>
<script>
  import Welcome from "./welcome";
  import Words from "./words";
  import Favorite from './favorite'
  import More from './more'
  import Setting from './setting'
  import AlertTip from '../components/AlertTip';

  export default {
    data() {
      return {
        view: "",
        showWelcome: true,
        showAlert: false,
        alertText: '',
        alertCallback: null
      };
    },
    components: {
      Welcome,
      Words,
      Favorite,
      More,
      Setting,
      AlertTip
    },
    computed: {},
    created() {
      let vm = this;
      let isLoaded = false;
      let stay = async function () {
        await sleep(2500);
        if (!isLoaded) {
          stay();
        } else {
          vm.view = "Words";
          vm.showWelcome = false;
        }
      };
      vm.$store.dispatch('login', {
        type: 'check',
        storage: localStorage.getItem('-words-info-')
      }).then(function (data) {
        if (data.status) {
          stay();
          return vm.$store.dispatch('getWords');
        } else {
          vm.alertText = "您未登录，请先登录";
          vm.alertCallback = () => {
            vm.$router.replace({path: 'login'});
          };
          vm.showAlert = true;
        }
      }).then(function (data) {
        if (data) {
          isLoaded = true;
        }
      }).catch(function () {
        vm.alertText = "获取信息失败，请检查网络连接";
        vm.showAlert = true;
      });
    },
    methods: {
      closeTip() {
        this.showAlert = false;
        this.alertCallback && this.alertCallback();
      },
      changeAndUpdateFavor() {
        this.view = 'Favorite';
        this.$children[0].getMarkedWords();
      }
    }
  };

  async function sleep(ms) {
    return await new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }
</script>
<style lang="scss" scoped>
  @import "../assets/mixin";

  .body {
    @include wh(100%, 100%);
  }

  .view {
    height: calc(100% - 3.7rem);
  }

  footer {
    @include abs(auto, auto, 0);
    @include wh(100%, 3.7rem);
    @include sc(1.6rem, #ffffff);
    @include flex(space-around);
    background: $purple;
    div {
      width: 25%;
      line-height: 4rem;
      &.active {
        background: #FF7F50;
      }
    }
  }
</style>
