import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    contatos: [],
    contato: {},
    editando: false
  },
  mutations: {
    fullFill(state, contatos) {
      state.contatos = contatos;
    },
    excluir(state, id) {
      state.contatos = state.contatos.filter(e => e.id !== id);
    },
    adicionarContato(state, contato) {
      let index = state.contatos.findIndex(i => i.id == contato.id);
      if (index >= 0) {
        /*
         * Isso não funciona: state.contatos[index] =  contato;
         * O Vue precisa que os objetos do array possam ser observados e
         * a forma abaixo é a correta de fazer isso.
         */
        Vue.set(state.contatos, index, { ...contato });
      } else {
        state.contatos.push(contato);
        state.contato = {};
      }
    },
    editando(state, editando) {
      state.editando = editando;
    },
    limparContato(state) {
      state.contato = {};
    },
    marcarParaEdicao(state, index) {
      state.contato = { ...state.contatos[index] };
    },
    removerTodosContatos(state) {
      state.contatos = [];
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
    },
    adicionarContato(context, contato) {
      context.commit("adicionarContato", contato);
      context.commit("editando", false);
    },
    prepararParaInclusao(context) {
      context.commit("limparContato");
      context.commit("editando", true);
    },
    prepararParaEdicao(context, index) {
      context.commit("marcarParaEdicao", index);
      context.commit("editando", true);
    },
    removerTodosContatos(context) {
      context.commit("removerTodosContatos");
      context.commit("editando", false);
    }
  },
  getters: {
    possuiContatos: state => {
      return state.contatos.length > 0;
    }
  }
});
