import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    // sale : {},
    products:[],
    menudosificacion:false,
    creardosificacion:false,
    modificardosificacion:false,
    eliminardosificacion:false,
    menurubro:false,
    crearrubro:false,
    modificarrubro:false,
    eliminarrubro:false,
    menuproducto:false,
    crearproducto:false,
    modificarproducto:false,
    eliminarproducto:false,
    menuusuario:false,
    crearusuario:false,
    modificarusuario:false,
    eliminarusuario:false,
    menucliente:false,
    crearcliente:false,
    modificarcliente:false,
    eliminarcliente:false,
    menuventa:false,
    crearventa:false,
    anularventa:false,
    menureporte:false,
    menudeliveri:false,
    modificardeliveri:false,
    boolresumendia:false,
    boolgraficaproducto:false,
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, dat){
      // console.log(dat.user);
      // console.log(dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 2));
      state.status = 'success';
      state.token = dat.token;
      state.user = dat.user;
      state.menudosificacion=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 1)!=undefined
      state.creardosificacion=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 2)!=undefined
      state.modificardosificacion=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 3)!=undefined
      state.eliminardosificacion=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 4)!=undefined
      state.menurubro=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 5)!=undefined
      state.crearrubro=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 6)!=undefined
      state.modificarrubro=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 7)!=undefined
      state.eliminarrubro=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 8)!=undefined
      state.menuproducto=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 9)!=undefined
      state.crearproducto=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 10)!=undefined
      state.modificarproducto=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 11)!=undefined
      state.eliminarproducto=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 12)!=undefined
      state.menuusuario=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 13)!=undefined
      state.crearusuario=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 14)!=undefined
      state.modificarusuario=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 15)!=undefined
      state.eliminarusuario=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 16)!=undefined
      state.menucliente=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 17)!=undefined
      state.crearcliente=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 18)!=undefined
      state.modificarcliente=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 19)!=undefined
      state.eliminarcliente=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 20)!=undefined
      state.menuventa=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 21)!=undefined
      state.crearventa=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 22)!=undefined
      state.anularventa=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 23)!=undefined
      state.menureporte=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 24)!=undefined
      state.menudeliveri=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 25)!=undefined
      state.modificardeliveri=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 26)!=undefined
      state.boolresumendia=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 27)!=undefined
      state.boolgraficaproducto=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 28)!=undefined
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = {}
      state.menudosificacion=false
      state.creardosificacion=false
      state.modificardosificacion=false
      state.eliminardosificacion=false
      state.menurubro=false
      state.crearrubro=false
      state.modificarrubro=false
      state.eliminarrubro=false
      state.menuproducto=false
      state.crearproducto=false
      state.modificarproducto=false
      state.eliminarproducto=false
      state.menuusuario=false
      state.crearusuario=false
      state.modificarusuario=false
      state.eliminarusuario=false
      state.menucliente=false
      state.crearcliente=false
      state.modificarcliente=false
      state.eliminarcliente=false
      state.menuventa=false
      state.crearventa=false
      state.anularventa=false
      state.menureporte=false
      state.menudeliveri=false
      state.modificardeliveri=false
      state.boolresumendia=false
      state.boolgraficaproducto=false
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        // console.log(process.env.URL+'/login');
        // return false;
        commit('auth_request')
        let url=process.env.URL+'/login';
        // console.log(url);
        // return false;
        axios({url, data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user[0]
            // console.log(user)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token
            // console.log(user.name);
            commit('auth_success', {token,user})
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
