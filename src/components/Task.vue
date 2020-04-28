<template>
  <li>
    <TaskIcon />
    <div class="content">{{ task.content }}</div>
  </li>
</template>

<style lang="scss" scoped>
li {
  &:not(:first-child) {
    margin-top: 20px;
  }
  font-size: 1.2rem;
  align-items: center;
  display: flex;
  .content {
    margin: 0 0 0 20px;
  }
}
</style>

<script>
import TaskIcon from "./TaskIcon.vue";

export default {
  name: "Task",
  components: { TaskIcon },
  props: ["task"],
};
</script>
