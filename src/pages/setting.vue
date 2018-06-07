<template>
  <div>
    <header>设置</header>
    <div class="list">
      <label for="num_per_turn"
      >每轮单词数量: <input id="num_per_turn" type="number" min="1" max="100" v-model="countNumber"></label>
      <span class="turn_confirm" @click="updateCountNumber">确定</span>
    </div>
    <div class="list">当前已学习单词数:{{$store.state.startIndex}}</div>
    <div class="logout_container" @click="logout">退出登录</div>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    data() {
      return {
        countNumber:10
      };
    },
    created() {
     this.countNumber = this.$store.state.countNumber
    },
    methods: {
      logout() {
        console.log('logout');
        this.$store.dispatch('logout').then(() => {
          this.$router.replace({path: '/'});
        });
      },
      updateCountNumber() {
        this.$store.dispatch('updateCountNumber',this.countNumber).then((data) => {
          console.log(data);
          if(!data.status){

          }
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

  .list {
    text-align: left;
    margin: 1rem 0.5rem;
  }

  .logout_container {
    margin: 0.5rem 5rem;
    background-color: #ff0c00;
    padding: .5rem 0;
    border: 1px;
    color: #ffffff;
    border-radius: 0.15rem;
    text-align: center;
  }

  #num_per_turn {
    width: 5rem;
    border: 1px solid #4d4d4d;
   font-size: inherit;
  }

  .turn_confirm {
    padding: 0.1rem 0.5rem;
    background: $blue;
    color: #ffffff;
  }
</style>
