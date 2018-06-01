<template>
  <div class="mylogo">
      <div class="rectangle rectangle-1">
          <div class="rectangle rectangle-2">
              <div class="rectangle rectangle-3">
                  <div class="rectangle rectangle-4">
                      <div class="rectangle rectangle-5"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
    .mylogo{
        display: inline-block;
        width: 100px;
        height: 100px;
    }
    .rectangle{
        display: inline-block;
        box-sizing: border-box;
    }
    $bg: #111111;
    .rectangle-1{
        width: 100px;
        height: 100px;
        border: 10px solid $bg;
        animation: rotate 0.5s ease-in forwards;
    }
    .rectangle-2{
        width: 80px;
        height: 80px;
        border: 10px solid $bg*3;
        animation: rotate 0.75s ease-in forwards;
    }
    .rectangle-3{
        width: 60px;
        height: 60px;
        border: 10px solid $bg*6;
        animation: rotate 1s ease-in forwards;
    }
    .rectangle-4{
        width: 40px;
        height: 40px;
        background: $bg*9;
        border: 10px solid $bg*9;
        animation: rotate 1.25s ease-in forwards;
    }
    .rectangle-5{
        width: 20px;
        height: 20px;
        background: #ffffff;
        border: 0 solid $bg*12;
        border-radius: 50%;
        animation: blink .25s 1.5s cubic-bezier(0,.5,1,.5) 2;
    }
    @keyframes rotate{
        from {transform: rotate(0)}
        to {transform: rotate(90deg)}
    }
      @keyframes blink {
        0%{border-top-width: 0;border-bottom-width: 0;}
        30%{border-top-width: 10px;border-bottom-width: 10px;}
        50%{border-top-width: 10px;border-bottom-width: 10px;}
        80%{border-top-width: 0;border-bottom-width: 0;}
    }
</style>
