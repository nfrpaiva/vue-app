<template>
  <div id="app">
    <header class="showcase">
      <div class="content">
        <img src="./assets/logo.svg" alt="" class="logo">
        <div class="title">Lorem, ipsum.</div>
        <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, praesentium?</div>
        <a href="#container" class="btn btn-outline-primary">Começar</a>
      </div>
    </header>
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
import Post from "./components/Post.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
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

<style>
.showcase::after {
  content: "";
  height: 100vh;
  width: 100%;
  background-image: url("./assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: block;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  transition: all 1000ms;
}
.showcase:hover::after {
  filter: blur (0px);
  -webkit-filter: blur(0px);
}
.showcase:hover .content {
  /* filter: blur (2px);
  -webkit-filter: blur(2px); */
}
.showcase .content a {
  color: aliceblue;
  border-color: aliceblue;
  margin-top: 1rem;
}
.showcase:hover .content a {
  background-color: unset;
}
.content {
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 50%;
  margin-top: 0px;
  margin-left: -150px;
  width: 300px;
  height: 350px;
  color: azure;
  text-align: center;
  transition: all 1000ms;
}
.content .logo {
  height: 180px;
  width: 180px;
}
#container {
  transition: all 1000ms;
}
.content .title {
  font-size: 2.2rem;
  margin-top: 1rem;
}
.content .text {
  line-height: 2rem;
  margin-top: 1rem;
}
body {
  margin: 0px;
}
html {
  font-family: Arial, Helvetica, sans-serif;
}
</style>

