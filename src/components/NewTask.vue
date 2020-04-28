<template>
  <form id="newtask" @submit.prevent="submit">
    <NewTaskStatusSelector :status="status" @click.native="switchStatus" />
    <input
      type="text"
      placeholder="Write something you did today..."
      v-model="value"
    />
    <transition name="fade">
      <input v-if="value" type="submit" value="Submit" />
    </transition>
  </form>
</template>

<script>
import NewTaskStatusSelector from "./NewTaskStatusSelector.vue";

export default {
  data() {
    return {
      status: "done",
      value: "",
    };
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

    async submit() {
      this.value = "";
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
  background: #fff;
}
input[type="submit"] {
  border: none;
  text-decoration: none;
  background: #27ae60;
  color: white;
  border-radius: 30px;
  padding: 10px 30px;
  margin-right: 15px;
  align-self: center;
  font-size: 1.35em;
  cursor: pointer;
}
input[type="text"] {
  border: 0;
  padding: 15px;
  width: 100%;
  font-size: 1.35rem;
  font-weight: 700;
  border-radius: 0 6px 6px 0;
  outline: none;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
