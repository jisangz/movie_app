<template>
  <!-- <div>{{ movie.imdbID }}</div> -->
  <RouterLink 
    :to ="`/movie/${movie.imdbID}`"
    class="movie" 
    :style="{backgroundImage:`url(${movie.Poster})`}">
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute/>
    <div class="info">
      <div class="year">{{ movie.Year }}</div>
      <div class="title">{{ movie.Title }}</div>
    </div>
    <!-- <img 
      :src="movie.Poster" 
      alt="" width="200" > -->
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components:{
    Loader
  },
  props:{
    movie:{
      type: Object,
      //동적인 데이터를 대응하기 위해 함수형식을 쓸수 있다.
      default: () => ({})
    }
  },
  data(){
    return {
      imageLoading:true
    }
  },
  mounted(){
    //html 객체를 사용할경우 create보단 mounted를 권장한다.
    this.init()
  },
  methods:{
    async init(){
      // const img = document.createElement('img')
      // img.src = this.movie.Poster
      // img.addEventListener('load', ()=>{
      //   //일반적인 function함수일 경우 this는 호출 되는 위치에서의 this로 인식하여
      //   // 데이터를 가져올수 없다.
      //   this.imageLoading = false
      // })
      const poster = this.movie.Poster
      if(!poster || poster === 'N/A'){
        this.imageLoading = false
      }else{
        await this.$loadImage(poster)
        this.imageLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import "~/scss/main";
  
  .movie{
    $width:200px;
    width: $width;
    height: $width * (3 / 2);
    margin: 10px;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
    &:hover::after{
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 6px solid $primary;
    }
    .info{
      background-color: rgba($black, .3);
      width: 100%;
      padding: 14px;
      font-size: 14px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      color:$white;
      backdrop-filter:blur(10px);
      .year{
        color:$primary;
      }
      .title{
        width: 100%;
        color:$white;
        white-space: nowrap;
        overflow : hidden;
        text-overflow: ellipsis;
        
      }

    }
  }
</style>