<template>
  <div>
    Home
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.getUser();
  },
  methods: {
    ...mapActions(["getUser"])
  }
};
</script>
