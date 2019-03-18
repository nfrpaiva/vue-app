<template>
  <form class="mt-1">
    <fieldset>
      <Input name="id" v-model="contatoEmEdicao.id" label="Id"/>
      <Input name="nome" v-model="contatoEmEdicao.nome" label="Nome"/>
      <Input name="email" type="email" v-model="contatoEmEdicao.email" label="E-mail"/>
      <TextArea name="body" v-model="contatoEmEdicao.body" label="Body"/>
      <button @click.stop.prevent="handleAdicionarContato" class="btn btn-success">Adicionar</button>
    </fieldset>
  </form>
</template>

<script>
import Input from "./Input.vue";
import TextArea from "./TextArea.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Input,
    TextArea
  },
  beforeMount() {
    this.contatoEmEdicao = { ...this.contato };
  },
  watch: {
    contato: function(novo) {
      this.contatoEmEdicao = { ...novo };
    }
  },
  methods: {
    handleAdicionarContato() {
      this.adicionarContato(this.contatoEmEdicao);
    },
    ...mapActions(["adicionarContato"])
  },
  data() {
    return {
      contatoEmEdicao: {}
    };
  },
  props: {},
  computed: {
    ...mapState(["contato"])
  },
  filters: {}
};
</script>

<style>
</style>
