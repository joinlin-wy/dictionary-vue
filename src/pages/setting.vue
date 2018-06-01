<template>
  <div>
    <header>设置</header>
    <div class="list">
      <label for="num_per_turn"
      >每轮单词数量: <input id="num_per_turn" type="number" v-model="countNumber"></label>
    </div>
    <div class="list">当前已学习单词数:{{startIndex}}</div>
    <div class="logout_container" @click="logout">退出登录</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'setting',
    computed:{
      ...mapState(['countNumber','startIndex'])
    },
    methods:{
      logout(){
        console.log('logout');
        this.$store.dispatch('logout').then(() => {
          this.$router.replace({path:'/'})
        })
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
  .list{
    text-align: left;
    margin: 1rem 0.5rem;
  }
  .logout_container {
    margin: 0.5rem 10rem;
    background-color: #ff0c00;
    padding: .5rem 0;
    border: 1px;
    color: #ffffff;
    border-radius: 0.15rem;
    text-align: center;
  }
</style>
