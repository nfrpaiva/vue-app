<template>
  <div id="app">
    <div class="container">
      <button @click="clean" class="btn btn-danger">Limpar</button>
      <button @click="carregar" class="btn btn-success m-2 ">Carregar</button>
      <br>
      <Contatos v-on:excluir-contato="excluir" v-show="show" :itens="itens"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Contatos from "./components/Contatos.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    HelloWorld,
    Contatos
  },
  created() {
    //this.$http.get("https://jsonplaceholder.typicode.com/users");
    // console.log(this.$http);
    this.carregar();
  },
  methods: {
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
        this.itens = contatos;
        this.show = true;
      });

      // this.itens = [
      //   { id: 1, nome: "Pedro", usuario: "Silva" },
      //   { id: 2, nome: "Jose", usuario: "Mola" },
      //   { id: 3, nome: "Jose", usuario: "Mola" },
      //   { id: 4, nome: "Jose", usuario: "Mola" }
      // ];
    }
  },
  data() {
    return {
      todo: "Primeiro valor",
      itens: [
        { id: 40, nome: "Pedro", usuario: "Silva" },
        { id: 42, nome: "Jose", usuario: "Mola" }
      ],
      show: false
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
