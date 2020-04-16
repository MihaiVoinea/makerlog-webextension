<template>
  <div>Home {{ user.first_name || "no" }}</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  mounted() {
    this.getUser();
  },
  methods: {
    ...mapActions(["getUser"])
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
