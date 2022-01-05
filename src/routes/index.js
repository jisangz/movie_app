import { createRouter , createWebHashHistory, createWebHistory } from "vue-router"
import Home from './Home';
import About from './About';
import Movie from './Movie';
import NotFound from './NotFound'

export default createRouter({
  
    
    //Hash 모드 , history 모드
    //현재는 hash 모드
    //https://www.heygrew.com/#/ehr < -- hash 모드 사용시 주소
    //특정화면에서 새로고침시 화면을 찾을수 없다는 현상을 방지하기 위해 hash 모드 사용
    // hash 모드를 사용하지 않을려면 서버 셋팅으로 history 모드를 성정해야한다.
    // history:createWebHashHistory(),
    history: createWebHistory() ,
    scrollBehavior(){
       return { top:0 }  
    },
    // pages
    routes:[
      { // 메인 페이지 설정
        path:'/', // 주소
        component:Home //실제 호출된 컴포넌트
      },
      { 
        path:'/about',
        component:About
      },
      { 
        path:'/movie/:mid',
        component:Movie
      },
      { 
        path:'/:notFound(.*)*',
        component:NotFound
      },
    ]
  
})