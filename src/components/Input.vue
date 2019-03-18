<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <input class="form-control" :type="type" :value="model" v-on:input="handleInput">
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    model: null,
    name: {},
    label: {},
    type: {
      default() {
        return "text";
      }
    },
    filter: null
  },
  data() {
    return {};
  },
  methods: {
    handleInput(e) {
      const value = this.filter ? this.filter(e.target.value) : e.target.value;
      this.$emit("input", value);
    }
  }
};
</script>
