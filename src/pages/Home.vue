<template>
  <div><Header></Header></div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../components/Header";

export default {
  components: {
    Header
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
