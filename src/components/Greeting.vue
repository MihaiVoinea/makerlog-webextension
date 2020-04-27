<template>
  <span>{{ greeting }}, {{ user.first_name }}!</span>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      greeting: "Hello",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    const now = new Date();
    if (now.getHours > 3 && now.getHours < 12) this.greeting = "Good morning";
    else if (now.getHours > 12 && now.getHours < 17)
      this.greeting = "Good afternoon";
    else this.greeting = "Good evening";
  },
};
</script>

<style lang="scss" scoped>
span {
  font-size: 1.5em;
}
</style>
