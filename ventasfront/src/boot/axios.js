import Vue from 'vue'
import axios from 'axios'
import store from '../store';
Vue.prototype.$axios = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer '+token
  axios.post(process.env.URL+'/me').then(res=>{
    // console.log(res.data);
    // store.state.user=res.data[0];
    store.commit('auth_success',{user:res.data[0],token:token})
    // localStorage.setItem('user',res.data);
  })
}
