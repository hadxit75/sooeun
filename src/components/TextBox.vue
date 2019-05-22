<template>
  <input type="text" />
</template>

<script>
export default {
  name: "textbox",
  props: {
    title: String,
    header: Array,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 150px;
}
</style>
