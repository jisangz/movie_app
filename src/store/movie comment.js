import axios from 'axios'
import { reject } from 'lodash';
import _uniqBy from 'lodash/uniqBy'

export default {
  //module 
  namespaced:true, // 하나의 store 에서 모듈화 되어 동작할수 있게 하는 옵션
  
  //data 
  // state: () => {
  //   return{
  //     movies:[]
  //   }
  // },
  // javascript 형식에 맞춰 축소 할수 있다.
  state: () => ({
      movies:[],
      message:'',
      loading:false
  }),
  
  //computed
  getters:{
    // movieIds(state){ //활용할 데이터를 명시해주어야 활용가능 state에 선언되어 있는경우도 동일하다
    //   return state.movies.map(m => m.imdbID)
    // }
  },  // 계산된 상태의 값을 만들어내는 영역
  
  //methods - 함수를 만들어 활용하는 영역
  mutations:{ //변이! 데이터를 변경시켜줄수 있다. state의 데이터를 변경할수 있는 유일한 영역
              // 데이터를 변경하는 mehtods만을 선언한다.
    resetMovies(state){
      state.movies = [];
    },
    // assignMovies(state,Search){
    //   state.movies = Search;
    // }
    updateState(state,payload){
      //['movies','message','loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }

  },
  actions:{ 
    //데이터 변경을 제외한 나머지 methods를 작성하는곳
    //비동기로 동작을 한다.
    async searchMovies({state , commit} , payload){ 
      try {
        //state를 직접적으로 가져올수 없다 , context를 지정하거나 {state}등으로 가져올수 있다.
        //context 를 통하여 다른 영역데이터를 가져올수 있다
        // context.state
        // context.getters
        // context.commit

        //객체 구조 분해
        // const {title, type ,number , year } = payload

        // const OMDB_API_KEY = '2c7281ed'
        // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
        const res = await _fetchMovie({...payload,page:1})

        //console.log(res);
        const {Search, totalResults} = res.data
        // context 전체 명시가 아닌 부분 명시로 사용이 가능하다
        commit('updateState',{
          movies: _uniqBy(Search,'imdbID') ,
          // message:'Hellor World',
          // loading:true
        })
        console.log(totalResults)
        console.log(typeof totalResults)

        const total =  parseInt(totalResults,10)
        const pageLength = Math.ceil(total/10)

        if(pageLength > 1 ){
          for(let p = 2; p <= pageLength ; p++){
            if(p > payload.number / 10){
              break
            }
            // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${p}`)
            const res = await _fetchMovie({...payload,page:p})
            const {Search } = res.data
            commit('updateState',{
              movies:[
                ...state.movies
                , ..._uniqBy(Search,'imdbID') ]
            })
          }
        }
      } catch (message) {
        commit('updateState',{
          movies : [],
          message
        })
      }
      
    }
  }
}

// 명칭앞 '_'이 붙으면 해당 스크립트 내에서만 사용된다는 의미
function _fetchMovie(payload){
  const {title,type,year,page} = payload
  
  const OMDB_API_KEY = '2c7281ed'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  return new Promise((resolve, reject) => {
    axios.get(url).then(res =>{
      // console.log(res)
      if(res.data.Error){
        reject(res.data.Error)
        return
      }
      resolve(res)
    })
    .catch(err => {
      reject(err.message)
    })
  })
}