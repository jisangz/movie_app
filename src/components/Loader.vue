<template>
  <!-- vue 에서는 케밥케이스를 자동으로 카멜케이스로 바꿔준다 -->
  <div 
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex
    }" 
    :class="{absolute, fixed}" class="spinner-border text-primary"></div>
</template>

<script>
export default {
  props:{
    size:{
      type:Number,
      default:2
    },
    zIndex:{
      type:Number,
      default:0
    },
    absolute:{
      type:Boolean,
      default:false
    },
    fixed:{
      type:Boolean,
      default:false
    },
  }
}
</script>

<style lang="scss" scoped>
.spinner-border{
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute{
    position: absolute;
  }
  &.fixed{
    position: fixed;
  }
}
</style>