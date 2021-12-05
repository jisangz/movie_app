export default {
  namespaced: true,
  // 아래의 형태로 대체 할수 있다.
  //  state: () => {
  //     return
  //  },
  state: () => ({
    name:'jeong',
    email:'shinjisang@gmail.com',
    blog:'no',
    phone:'+82-01-9314-3512',
    image:'https://heropy.blog/css/images/logo.png'
  })
}