<template>
  <li>{{ task.content }}</li>
</template>

<style lang="scss" scoped>
li {
  font-size: 1.2rem;
}
</style>

<script>
export default {
  props: ["task"],
};
</script>
