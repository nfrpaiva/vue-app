<template>
  <div id="app">
    <!-- <show-case/> -->
    <div class="container" id="container">
      <ContatoForm v-if="editando"/>
      <div class="float-right">
        <button @click="removerTodosContatos" class="btn btn-outline-danger">Limpar</button>
        <button @click="fullFill" class="btn btn-outline-success m-2">Carregar</button>
        <button @click.stop.prevent="prepararParaInclusao" class="btn btn-outline-primary">Incluir</button>
      </div>
      <br>
      <Contatos v-show="possuiContatos" :itens="itens"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Contatos from "./components/Contatos.vue";
import ShowCase from "./components/ShowCase";
import ContatoForm from "./components/ContatoForm.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Contatos,
    ContatoForm,
    ShowCase
  },
  created() {
    this.fullFill();
  },
  methods: {
    ...mapActions({ fullFill: "fullFill" }),
    ...mapActions(["excluir", "prepararParaInclusao", "removerTodosContatos"])
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ itens: "contatos" }),
    ...mapState(["editando"]),
    ...mapGetters(["possuiContatos"])
  }
};
</script>