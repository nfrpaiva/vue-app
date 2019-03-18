<template>
  <div class="form-group">
    <label for="nome">{{label}}</label>
    <textarea :value="model" class="form-control" cols="10" rows="5" v-on:input="handleInput"></textarea>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    model: null,
    name: {},
    label: {}
  },
  data() {
    return {};
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
