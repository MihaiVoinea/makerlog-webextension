<template>
  <header id="header">
    <a href="https://getmakerlog.com" class="logo">
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient
            id="brand-gradient"
            x1="100.37%"
            y1="99.62%"
            x2="-0.37%"
            y2="0.38%"
          >
            <stop stop-color="#00ad71"></stop>
            <stop offset="1.24" stop-color="#47e0a0"></stop>
          </linearGradient>
        </defs>
        <path
          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
        />
      </svg>
      <h1>Makerlog</h1>
    </a>
    <div>
      <Greeting />
    </div>
    <a :href="`https://getmakerlog.com/@${user.username}`" class="user">
      <img
        :src="user.avatar"
        :alt="`${user.first_name} ${user.last_name}`"
        class="avatar"
      />
      <div class="stats">
        <span>🔥</span><span>{{ user.streak }}</span>
      </div>
    </a>
  </header>
</template>

<style lang="scss" scoped>
.user {
  padding: 4px;
  width: 156.575px;
  display: flex;
  align-items: center;
  margin: auto 40px;
  justify-content: flex-end;
  text-decoration: none;
  img {
    z-index: 2;
  }
  .stats {
    padding: 8px 12px 8px 14px;
    position: relative;
    right: 5px;
    z-index: 1;
    background: #f5f5f5;
    border-radius: 0 16px 16px 0;
  }
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 100%;
}
#header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 0.2px solid var(--c-border-lightest);
}
.logo svg {
  width: 30px;
  path {
    fill: url(#brand-gradient) #47e0a0;
  }
}
.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 14px 40px;
  color: var(--c-main-light);
}
.logo h1 {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;
  margin: 0 0 0 10px;
}
</style>

<script>
import { mapState } from "vuex";
import Greeting from "./Greeting.vue";

export default {
  components: { Greeting },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
