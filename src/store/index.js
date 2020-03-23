import Vue from "vue";
import Vuex from "vuex";
// import usuarios from "./module-usuarios";
Vue.use(Vuex);

// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     state: {
//       user: false,
//       globalHeight: 0,
//       verificaUsuario: ""
//     },
//     mutations: {
//       setUser(state, payload) {
//         state.user = payload;
//       },
//       setGlobalHeight(state, payload) {
//         state.globalHeight = payload;
//       },
//       usuario_a_verificar(state, payload) {
//         state.verificaUsuario = payload;
//       }
//     },
//     getters: {
//       user(state) {
//         return state.user;
//       },
//       globalHeight(state) {
//         return state.globalHeight;
//       },
//       verificaUsuario(state) {
//         return state.verificaUsuario;
//       }
//     },
//     strict: process.env.DEV
//   });
//   return Store
// }

export default new Vuex.Store({
  state: {
    user: false,
    globalHeight: 0,
    verificaUsuario: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setGlobalHeight(state, payload) {
      state.globalHeight = payload;
    },
    usuario_a_verificar(state, payload) {
      state.verificaUsuario = payload;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    globalHeight(state) {
      return state.globalHeight;
    },
    verificaUsuario(state) {
      return state.verificaUsuario;
    }
  },
  strict: process.env.DEV
});
