<template>
  <ul>
    <TaskGroup
      v-for="(group, index) in groupedTasks"
      :key="index"
      :tasks="group"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import TaskGroup from "./TaskGroup.vue";

export const isSameDate = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

const groupTasksByDate = (tasks) => {
  let lastTaskDate = new Date(tasks[0].created_at);

  let group = [];

  const groupedTasks = [];

  tasks.forEach((task) => {
    const currentlyIteratedTaskDate = new Date(task.created_at);
    if (isSameDate(lastTaskDate, currentlyIteratedTaskDate)) {
      group.push(task);
    } else {
      groupedTasks.push(group);
      group = [];
      group.push(task);
    }
    lastTaskDate = currentlyIteratedTaskDate;
  });
  return groupedTasks;
};

export default {
  data() {
    return {
      groupedTasks: undefined,
    };
  },
  components: { TaskGroup },
  async mounted() {
    await this.$store.restored;
    this.groupedTasks = groupTasksByDate(this.tasks);
  },
  computed: {
    ...mapState({
      tasks: (state) => state.task.tasks,
    }),
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 40px 0 0 0;
}
</style>
