<template>
<form class="m-2" >
    <FormGroup name="id" :model.sync="contato.id" label ="Id" />
    <FormGroup name="nome" :model.sync="contato.nome" label ="Nome"/>
    <FormGroup name="email" type="email" :model.sync="contato.email" label ="E-mail"/>
    <FormGroup name="body" :model.sync="contato.body" label ="Body"/>
    
    <div class=form-group>
        <label for="id">Id</label>
        <input class=form-control type="text" v-model="contato.id">
    </div>
    <div class="form-group">
        <label for="nome">Nome</label>
        <input v-model="contato.nome" class="form-control" type="text" name="nome" id="nome">
    </div>
    <div class="form-group">
        <label for="nome">Email</label>
        <input v-model="contato.email" class="form-control" type="email" name="email" id="email">
    </div>
    <div class="form-group">
        <label for="nome">Body</label>
        <textarea v-model="contato.body" class="form-control" name="body" id="body" cols="10" rows="5"></textarea>
    </div>
    <button @click.stop.prevent="addPost" class="btn btn-success float-right">Adicionar</button>
    
    <code>{{JSON.stringify(contato, null, 2)}}</code>
    
</form>
</template>

<script>
import FormGroup from "./FormGroup.vue";
export default {
  components: {
    FormGroup
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
  }
};
</script>

<style>
</style>
