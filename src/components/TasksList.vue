<template>
  <ul
    v-infinite-scroll="loadMoreTasks"
    infinite-scroll-disabled="disableLoadingMoreTasks"
    infinite-scroll-distance="200"
  >
    <TaskGroup
      v-for="(group, index) in groupedTasks"
      :key="index"
      :tasks="group"
    />
  </ul>
</template>

<script>
import axios from "axios";
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

  // Go through all tasks and group them
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
  groupedTasks.push(group);
  return groupedTasks;
};

export default {
  data() {
    return {
      disableLoadingMoreTasks: false,
      loadedTasks: [],
      next: undefined,
    };
  },
  components: { TaskGroup },
  async mounted() {
    await this.$store.restored;
    this.next = this.$store.state.task.next;
  },
  computed: {
    groupedTasks() {
      return groupTasksByDate(this.tasks.concat(this.loadedTasks));
    },
    ...mapState({
      tasks: (state) => state.task.tasks,
    }),
  },
  methods: {
    async loadMoreTasks() {
      this.disableLoadingMoreTasks = true;
      try {
        const resp = await axios({
          url: this.next,
          method: "get",
        });
        if (resp.data) {
          this.loadedTasks = this.loadedTasks.concat(resp.data.results);
          this.next = resp.data.next;
          if (this.next) this.disableLoadingMoreTasks = false;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        if (this.next) this.disableLoadingMoreTasks = false;
      }
    },
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
