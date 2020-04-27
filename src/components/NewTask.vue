<template>
  <div id="newtask">
    <NewTaskStatusSelector :status="status" @click.native="switchStatus" />
    <input placeholder="Write something you did today..." />
  </div>
</template>

<script>
import NewTaskStatusSelector from "./NewTaskStatusSelector.vue";

export default {
  data() {
    return { status: "done" };
  },
  components: {
    NewTaskStatusSelector,
  },
  methods: {
    switchStatus() {
      if (this.status === "done") this.status = "doing";
      else if (this.status === "doing") this.status = "todo";
      else this.status = "done";
    },
  },
};
</script>

<style lang="scss" scoped>
#newtask {
  height: 4.375rem;
  display: flex;
  box-shadow: 0 4px 6px 0 var(--c-border);
  border-radius: 6px;
}
input {
  border: 0;
  padding: 15px;
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  border-radius: 0 6px 6px 0;
  outline: none;
}
</style>
