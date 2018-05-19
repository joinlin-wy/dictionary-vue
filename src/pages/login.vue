<template>
  <div class="loginContainer">
    <div class="title_container">
      <span :class="{active: type==='login'}" @click="type='login'">登录</span>
      |
      <span :class="{active: type==='register'}" @click="type='register'">注册</span>
    </div>
    <!--登录-->
    <div v-if="type==='login'">
      <form class="loginForm">
        <section class="input_container">
          <!-- 在“change”时而非“input”时更新 -->
          <input type="text" placeholder="账号" v-model.lazy="userAccount">
        </section>
        <section class="input_container">
          <input type="password" placeholder="密码" v-model="password">
        </section>
      </form>
      <p class="login_tips" :style="{color: !tips?'green':'red'}">
        {{tips||'温馨提示：登陆成功后下次不用重复登录'}}
      </p>
      <div class="login_container" @click="login">登录</div>
      <router-link to="/forget" class="psw_reset">重置密码？</router-link>
    </div>
    <!--注册-->
    <div v-else>
      <form class="loginForm">
        <section class="input_container">
          <input type="text" placeholder="账号" v-model.lazy="userAccount">
        </section>
        <section class="input_container">
          <input type="password" placeholder="密码" v-model="password">
        </section>
        <section class="input_container">
          <input type="password" placeholder="确认密码" v-model="passwordCheck">
        </section>
      </form>
      <p class="login_tips" :style="{color: !tips?'green':'red'}">
        {{tips||'温馨提示：注册成功后自动登录'}}
      </p>
      <div class="login_container" @click="register">注册</div>

    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import alertTip from '../components/AlertTip';
  import {mapState, mapMutations} from 'vuex';
  import crypto from 'crypto';

  export default {
    data() {
      return {
        userAccount: null, //账户
        password: null, //密码
        passwordCheck: null, //密码确认
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        tips: '',
        type: 'login'
      };
    },
    created() {
      this.userAccount = this.$store.state.account;
    },
    components: {
      alertTip
    },
    computed: {},
    methods: {
      login() {
        if (!this.userAccount || !this.password) {
          this.tips = "请输入用户名密码";
        }else{
          let vm = this;
          let psw = crypto.createHash("sha1")
            .update(this.password)
            .digest('hex');
          this.$store.dispatch('login', {account: this.userAccount, password: psw})
            .then(function (data) {
              if (data.status) {
                vm.$router.replace({path: '/'});
              } else {
                vm.tips = data.msg;
              }
            });
        }
      },
      register() {
        if(!this.userAccount){
          this.tips = "用户名为空"
        }else
        if(this.password.length<=6){
          this.tips = "请输入六位以上密码";
        }else if(this.password !== this.passwordCheck){
          this.tips = "两次密码输入不一致"
        }else{
          let vm = this;
          let password = crypto.createHash("sha1")
            .update(this.password)
            .digest('hex');
          this.$store.dispatch('register',{
            password,
            account: this.userAccount
          }).then(function (data) {
            vm.tips = data.msg;
            if(data.status){
              vm.$router.replace({path: '/'});
            }
          })
        }
      },
      closeTip() {
        this.$router.replace({path: '/'});
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import '../assets/mixin';

  .loginContainer {
    padding-top: 1rem;
  }

  .title_container {
    text-align: center;
    @include sc(1.7rem, #3d3e41);
    letter-spacing: 0.3rem;
    padding: 1rem 0;
    .active {
      color: #3b95e9;
    }
  }

  .loginForm {
    margin-top: .6rem;
    .input_container {
      padding: .8rem .6rem .5rem .6rem;
      border-bottom: 1px solid #f1f1f1;
      input {
        border: none;
        border-radius: 0.15rem;
        box-shadow: 0 0 1px #bfbfbf;
        box-sizing: border-box;
        width: 100%;
        line-height: 1.5rem;
        padding: .3rem;
      }
    }
  }

  .login_tips {
    @include sc(.6rem, red);
    padding: .4rem .6rem;
    line-height: .6rem;
    a {
      color: #3b95e9;
    }
  }

  .login_container {
    margin: 0 .5rem 1rem;
    color: #fff;
    background-color: #4abbd9;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }

  .psw_reset {
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
  }
</style>
