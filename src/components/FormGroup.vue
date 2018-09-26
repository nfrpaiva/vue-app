<template>
    <div class=form-group>
        <label :for="name">{{label}}</label>
        <input class=form-control :type="type" v-model="modelo" v-on:input="teste">
    </div>
</template>
<script>
export default {
  name: "FormGroup",
  props: {
    model: null,
    name: {},
    label: {},
    type: {
      default() {
        return "text";
      }
    }
  },
  data() {
    return {
      modelo: this.model
    };
  },
  methods: {
    teste(e) {
      console.log(e.target.value);
      this.$emit("update:model", e.target.value);
    }
  }
};
</script>
