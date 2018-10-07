<template>
  <div id="app">
    <show-case/>
    <div class="container" id="container">
      <Post v-if="editando" :contato="item" v-on:add-contato="addPost"/>
      <div class="float-right">
        <button @click="clean" class="btn btn-outline-danger">Limpar</button>
        <button @click="carregar" class="btn btn-outline-success m-2 ">Carregar</button>
        <button @click.stop.prevent="incluir" class="btn btn-outline-primary" >Incluir</button>
      </div>
      <br>
      <Contatos v-on:editar-contato="editarContato" v-on:excluir-contato="excluir" v-show="show" :itens="itens"/>
    </div>
  </div>
</template>

<script>
import Contatos from "./components/Contatos.vue";
import ShowCase from "./components/ShowCase";
import Post from "./components/Post.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Contatos,
    Post,
    ShowCase
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
    incluir() {
      this.item = {};
      this.editando = true;
    },
    clean() {
      this.itens = [];
      this.editando = false;
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
        contatos = contatos.filter(e => e.id <= 5);
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