import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state: {
    contatos: []
  },
  mutations: {
    fullFill(state, contatos) {
      state.contatos = contatos;
    },
    excluir(state, id) {
      state.contatos = state.contatos.filter(e => e.id !== id);
    }
  },
  actions: {
    fullFill(context) {
      return new Promise((resolve, reject) => {
        let url = "https://jsonplaceholder.typicode.com/comments";
        axios
          .get(url)
          .then(res => {
            let contatos = res.data.map(res => {
              return {
                id: res.id,
                nome: res.name,
                usuario: res.username,
                email: res.email,
                body: res.body
              };
            });
            contatos = contatos.filter(e => e.id <= 5);
            context.commit("fullFill", contatos);
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    excluir(context, id) {
      context.commit("excluir", id);
    }
  }
});
