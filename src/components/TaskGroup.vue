<template>
  <li class="task-group">
    <div class="date">
      <span class="week-day">{{ formattedWeekDay }}</span>
      <span class="full-date">{{ formattedFullDate }}</span>
    </div>
    <ul class="card">
      <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.task-group {
  margin: 25px 0;
}
.card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  background: #fff;
  border-top: 3px solid #27ae60 !important;
  list-style: none;
}
.date {
  font-size: 1.5rem;
  line-height: 1.25;
  .week-day {
    color: #1a1a1a;
  }
  .full-date {
    color: #6e6e6e;
  }
}
</style>

<script>
import { isSameDate } from "./TasksList.vue";
import Task from "./Task.vue";

export default {
  props: ["tasks"],
  components: { Task },
  computed: {
    date() {
      return new Date(this.tasks[0].created_at);
    },
    formattedWeekDay() {
      const today = new Date();

      if (isSameDate(this.date, today)) {
        return "Today";
      }
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      if (isSameDate(this.date, yesterday)) {
        return "Yesterday";
      }

      return Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        this.date
      );
    },
    formattedFullDate() {
      return `${Intl.DateTimeFormat("en-US", { month: "short" }).format(
        this.date
      )} ${this.date.getDate()}, ${this.date.getFullYear()}`;
    },
  },
};
</script>
