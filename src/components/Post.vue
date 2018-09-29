<template>
<form class="m-2" >
    <Input name="id" :model.sync="contato.id"  label="Id" />
    <Input name="nome" :model.sync="contato.nome" label ="Nome"/>
    <Input name="email" type="email" :model.sync="contato.email" label ="E-mail"/>
    <TextArea name="body" :model.sync="contato.body" label ="Body"/>
    <button @click.stop.prevent="addPost" class="btn btn-success float-right">Adicionar</button>
</form>
</template>

<script>
import Input from "./Input.vue";
import TextArea from "./TextArea.vue";
export default {
  components: {
    Input,
    TextArea
  },
  props: {
    contato: null
  },
  methods: {
    addPost() {
      this.$emit("add-contato", this.contato);
    }
  },
  data() {
    return {};
  },
  filters: {}
};
</script>

<style>
</style>
