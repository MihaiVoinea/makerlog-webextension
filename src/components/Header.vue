<template>
  <div>
    <a href="https://getmakerlog.com" id="logo">
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
      <img
        :src="user.avatar"
        :alt="`${user.first_name} ${user.last_name}`"
        class="avatar"
      />
      <div>
        <span>🔥</span><span>{{ user.streak }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
}
#logo svg {
  width: 30px;
  path {
    fill: url(#brand-gradient) #47e0a0;
  }
}
#logo {
  text-decoration: none;
  display: flex;
  padding: 2px;
  margin: 8px;
  color: var(--c-main-light);
}
#logo h1 {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;
  margin: 0 0 0 10px;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    console.log(this.user);
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
