import store from '@/store'
// 用户信息持久化
let user = localStorage.getItem('user')
if(user) {
  user = JSON.parse(user)
  store.commit('loginModule/setUser',user)
}