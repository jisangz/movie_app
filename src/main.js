import { createApp } from 'vue';
import App from './App';
import loadImage from './plugins/loadImage';
// import router from './routes/index.js'
// import store from './store/index.js'
//해달 폴더의 index 파일을 우선으로 가져오기 때문에 생략할수 있다.
import router from './routes'
import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .use(loadImage)
  .mount('#app')


