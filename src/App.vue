<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "./config";

export default {
  computed: {
    ...mapState(["loadingStore"]),
    ...mapGetters(["isLoggedIn"])
  },
  watch: {
    // fix to check if the user isLoggedIn only after vuex-webextensions loaded the store from localStorage
    loadingStore() {
      if (!this.isLoggedIn) {
        window.location = config.makerlogOauthAuthorizationUrl;
      } else {
        this.$router.push("home");
      }
    }
  }
};
</script>
