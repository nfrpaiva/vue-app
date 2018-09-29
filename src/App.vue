<template>
  <div id="app">
    <div class="container">
      <Post v-if="editando" :contato="item" v-on:add-contato="addPost"/>
      <button @click="clean" class="btn btn-danger">Limpar</button>
      <button @click="carregar" class="btn btn-success m-2 ">Carregar</button>
      <br>
      <Contatos v-on:editar-contato="editarContato" v-on:excluir-contato="excluir" v-show="show" :itens="itens"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from "./components/HelloWorld.vue";
import Contatos from "./components/Contatos.vue";
import Post from "./components/Post.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    HelloWorld,
    Contatos,
    Post
  },
  created() {
    this.carregar();
  },
  methods: {
    addPost(post) {
      let index = this.itens.findIndex(i => i.id == post.id);
      if (index >= 0) {
        this.$set(this.itens, index, post);
      } else {
        this.itens.push(post);
      }
      this.item = {};
      this.editando = false;
    },
    editarContato(index) {
      this.item = { ...this.itens[index] };
      this.editando = true;
    },
    excluir(id) {
      this.itens = this.itens.filter(e => e.id !== id);
    },
    clean() {
      this.itens = [];
    },
    carregar() {
      let url = "https://jsonplaceholder.typicode.com/comments";
      axios.get(url).then(res => {
        let contatos = res.data.map(res => {
          return {
            id: res.id,
            nome: res.name,
            usuario: res.username,
            email: res.email,
            body: res.body
          };
        });
        contatos = contatos.filter(e => e.id <= 50);
        this.itens = contatos;
        this.show = true;
      });
    }
  },
  data() {
    return {
      itens: [],
      show: false,
      item: {},
      editando: false
    };
  }
};
</script>

<style>
#xapp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
