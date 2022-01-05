import axios from 'axios'
import { reject } from 'lodash';
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title';

export default {

  namespaced:true, 
  
  state: () => ({
      movies:[],
      message:_defaultMessage,
      loading:false,
      theMovie:{}
  }),
  
  //computed
  getters:{
  },  
  
  mutations:{ 
    resetMovies(state){
      state.movies = []
      state.message = _defaultMessage
      state.loading = false;
    },
    updateState(state,payload){
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }

  },
  actions:{ 
    async searchMovies({state , commit} , payload){
      if(state.loading){
        return
      }
      commit('updateState',{
        message:'',
        loading:true
      })

      try {
        const res = await _fetchMovie({...payload,page:1})

        const {Search, totalResults} = res.data
        commit('updateState',{
          movies: _uniqBy(Search,'imdbID') ,
        })
        // console.log(totalResults)
        // console.log(typeof totalResults)

        const total =  parseInt(totalResults,10)
        const pageLength = Math.ceil(total/10)

        if(pageLength > 1 ){
          for(let p = 2; p <= pageLength ; p++){
            if(p > payload.number / 10){
              break
            }
            const res = await _fetchMovie({...payload,page:p})
            const {Search } = res.data
            commit('updateState',{
              movies:[
                ...state.movies
                , ..._uniqBy(Search,'imdbID') ]
            })
          }
        }
      // } catch (error) {
      } catch ({message}) {
        commit('updateState',{
          movies : [],
         // message : error.message
         message
          //서버리스 함수를 사용하면서 에러 메시지가 문자에서 객체로 변환 되기때문에 주의
        })
      } finally{
        commit('updateState',{
          loading:false
        })
      }
      // } catch (message) {
      //   commit('updateState',{
      //     movies : [],
      //     message
      //   })
      // } finally{
      //   commit('updateState',{
      //     loading:false
      //   })
      // }
      
    },
    
    async searchMovieWithId({state,commit} , payload){
      if(state.loading) return;

      commit('updateState',{
        theMovie:{},
        loading: true
      })

      //const {id} = payload
      try {
        const res = await _fetchMovie(payload);
        console.log(res.data)
        commit('updateState',{
          theMovie:res.data
        })

        // console.log(res)
      } catch (error) {
        // console.log(error)
        commit('updateState',{
          theMovie:{}
        })
      } finally {
        commit('updateState',{
          loading: false
       })
      }
    }
  }
}

async function _fetchMovie(payload){

  return await axios.post('/.netlify/functions/movie',payload)
  //post 와 get 차이 ajax 통신과 동일
  
  // const {title,type,year,page,id} = payload
  
  // const OMDB_API_KEY = '2c7281ed'

  // const url = id 
  //   ?`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  //   :`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  // return new Promise((resolve, reject) => {
  //   axios.get(url).then(res =>{
  //     if(res.data.Error){
  //       reject(res.data.Error)
  //       return
  //     }
  //     resolve(res)
  //   })
  //   .catch(err => {
  //     reject(err.message)
  //   })
  // })
}