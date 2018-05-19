<template>
  <section class="container">
    <div>
      <app-logo/>
      <div>
      <h1 class="title">
        {{ name }}
      </h1>
      <h2 class="subtitle">
        {{ description }}
      </h2>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from "@/components/MyLogo.vue";

export default {
  data() {
    return {
      name: "my word book",
      description: "我的单词本"
    };
  },
  components: {
    AppLogo
  }
};
</script>

<style scoped lang="scss">
  @import '../assets/mixin';
.container {
  position: absolute;
  top: 0;
  left: 0;
  @include wh(100%,100%);
  z-index: 100;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 30px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
