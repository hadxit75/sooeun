<template>
  <button>{{label}}</button>
</template>

<script>
export default {
  name: "button",
  props: {
    label: String,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 150px;
}
</style>
