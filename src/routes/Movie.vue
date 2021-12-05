<template>
    <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="spec">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <!-- //props를 html에서작성시 카멜케이스로 작성해선 안된다. -->
      <Loader 
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <div v-else class="movie-details">
      <div 
      :style="{ backgroundImage : `url(${requestDiffSizeImage(theMovie.Poster)})`}"
      class="poster" >
        <Loader
         v-if="imageLoading"
         absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-warp">
            <div
              v-for="{ Source:name , Value:score } in theMovie.Ratings" 
              :key="name"
              :title="name"
              class="rating">
                <!-- <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                  :alt="Nm">
                  <span> {{score}}</span> -->
                <img :src="`../assets/${name}.png`"
                  :alt="Nm">
                  <span> {{score}}</span>
              </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import { mapState , mapActions} from 'vuex'
export default {
  components: { Loader },
  data(){
    return {
      imageLoading:true
    }
  },
  computed:{
    ...mapState('movie',['theMovie','loading'])
    // theMovie(){
    //   return this.$store.state.movie.theMovie
    // },
    // loading(){
    //   return this.$store.state.movie.loading
    // }
  },
  created(){
    // console.log(this.$route)
    // Action을 헬퍼를 통하여 메소드에 선언하고 this로 가져올수 있다
    // 하지만 직관적이지 않아 권하지 않는다.
    // helper는 store 나 Mutations 에 더 권장 된다
    // this.$store.dispatch('movie/searchMovieWithId',{
    this.searchMovieWithId({
      //주소에서 파라미터를 받을수 있다.
      id : this.$route.params.mid
    })
  },
  methods:{
    ...mapActions('movie',[
      'searchMovieWithId'
    ]),
    requestDiffSizeImage(url,size = 1200){
      console.log(url)
      if(!url || url ==='N/A'){
        this.imageLoading = false
        return ''
      }

      const src = url.replace('SX300',`SX${size}`);
      //async await를 사용 할수 없을땐 then을 사용하여 비동기를 사용할수 있다.
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
      // return url.replace('SX300',`SX${size}`)
    }
  }

}
</script>

<style lang="scss" scoped>
// @import "~/scss/main.scss";

.container{
  padding-top: 40px;

}
.skeletons{
  display: flex;
  // flex는 최대한 폭을 적게 쓸려고하는 성질이 있음
  .poster{
    flex-shrink: 0;
    width:500px;
    height:500px * 3 / 2;
    margin-right: 70px;
    border-radius: 10px;
  }
  .spec{
    flex-grow: 1;
    //flex grow를 사용하여 증가 너비를 최대한 사용하도록  
  }
  .skeleton{
    border-radius: 10px;
    background-color: $gray-200;
    &.title{
      width: 80%;
      height: 70px;
    }
    &.spec{
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot{
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc{
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details{
    display: flex;
    color: $gray-600;

    .poster{
      width: 500px;
      height: 500px * 3 / 2;
      margin-right: 70px;
      border-right: 10px;
      border-radius: 10px;
      background-color: $gray-200;
      background-size: cover;
      background-position: center;
      flex-shrink: 0;
      position: relative;
    }
    .specs{
      flex-grow: 1;
      .title{
        color: black;
        font-family: 'Oswald',sans-serif;
        font-size: 70px;
        line-height: 1;
        margin-bottom: 30px;
      }
      .labels{
        color: $primary;
        span{
          &::after{
            content: "\00b7";
            margin: 0 6px;
          }
          &:last-child::after{
            display: none;
          }
        }
      }
      .plot{
        margin-top: 20px;
      }
      .ratings{
        .rating-warp{
          display: flex;
          .rating{
            display: flex;
            align-items: center;
            margin-right: 32px;
            img{
              height: 30px;
              flex-shrink: 0;
              margin-right: 6px;
            }
          }
        }
      }
       h3{
         margin: 24px 0 6px;
         color: $black;
         font-family: 'Oswald',sans-serif;
         font-size: 20px;
       }
    }
    @include media-breakpoint-down(xl) {
      .poster{
        width: 300px;
        height: 300px * 3 / 2;
        margin-right: 40px;
      }
    }
    @include media-breakpoint-down(lg) {
      display: block;
      .poster{
        margin-bottom: 40px;
      }
    }
    @include media-breakpoint-down(md) {
      .spec{
        .title{
          font-size: 50px;
        }
        .ratings{
          .rating-warp{
            display: block;
            .rating{
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
</style>