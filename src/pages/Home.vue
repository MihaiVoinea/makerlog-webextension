<template>
  <div id="home">
    <Header />
    <main><NewTask /></main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import NewTask from "../components/NewTask.vue";

export default {
  components: {
    Header,
    NewTask,
  },
};
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
main {
  margin: 40px auto;
  width: 50%;
  min-width: 900px;
}
@media screen and (max-width: 980px) {
  main {
    min-width: 91%;
  }
}
</style>
