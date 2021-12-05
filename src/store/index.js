import { createStore } from "vuex";
import movie from "./movie";
import about from "./about"


export default createStore({
  modules:{
    movie, // 데이터이름과 속성의 이름이 같으면 생략할수 있다 원형(movie:movie)
    about

  }
})