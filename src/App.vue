<template>
  <div id="app">
    <!-- <show-case/> -->
    <div class="container" id="container">
      <ContatoForm v-if="editando" :contato="item" v-on:add-contato="addPost"/>
      <div class="float-right">
        <button @click="clean" class="btn btn-outline-danger">Limpar</button>
        <button @click="carregar" class="btn btn-outline-success m-2">Carregar</button>
        <button @click.stop.prevent="incluir" class="btn btn-outline-primary">Incluir</button>
      </div>
      <br>
      <Contatos v-on:editar-contato="editarContato" v-show="show" :itens="itens"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Contatos from "./components/Contatos.vue";
import ShowCase from "./components/ShowCase";
import ContatoForm from "./components/ContatoForm.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Contatos,
    ContatoForm,
    ShowCase
  },
  created() {
    this.carregar();
  },
  methods: {
    addPost(post) {
      let index = this.itens.findIndex(i => i.id == post.id);
      if (index >= 0) {
        //this.$set(this.itens, index, post);
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
    incluir() {
      this.item = {};
      this.editando = true;
    },
    clean() {
      this.itens = [];
      this.editando = false;
    },
    carregar() {
      this.fullFill()
        .then(() => {
          this.show = true;
        })
        .catch(e => console.log("erro ao carregar", e));
    },
    ...mapActions({ fullFill: "fullFill" }),
    ...mapActions(["excluir"])
  },
  data() {
    return {
      //itens: [],
      show: false,
      item: {},
      editando: false
    };
  },
  computed: {
    ...mapState({ itens: "contatos" })
  }
};
</script>