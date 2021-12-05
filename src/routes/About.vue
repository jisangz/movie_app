<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute />
      <img :src="image" :alt="name">
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import {mapState } from 'vuex'

export default {
  components:{
    Loader
  },
  data(){
    return{
      imageLoading:true
    }
  },
  computed:{
    //전개 연산자 필수
    // 아래의 호출 연산 을 helper로 축소 할수 있다.
    // 모듈의 이름 명시후 배열데이터로 상태들의 이름을 명시해준다.
    //객체데이터 대신에  바로 지정 할수 도 있지만 다른 데이터 호출을 위해 전개연산자를 활용한다.
    ...mapState('about',['image','name','email','blog','phone'])

    // image() {
    //   return this.$store.state.about.image
    // },
    // name(){
    //   return this.$store.state.about.name
    // },
    // email(){
    //   return this.$store.state.about.email
    // },
    // blog(){
    //   return this.$store.state.about.blog
    // },
    // phone(){
    //   return this.$store.state.about.phone
    // },
  },
  //라이프 사이클에서는 비동기를 사용해선 안된다. 별도의 메소드를 만들어서 사용하여야 한다.
  mounted(){
    this.init()
  },
  methods:{
    async init(){
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>


<style lang="scss" scoped>
// @import "~/scss/main";

.about{
  text-align: center;
  .photo{
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name{
    font-size: 40px;
    font-family: 'Oswald',sans-serif;
    margin-bottom: 20px;
  }
}
</style>