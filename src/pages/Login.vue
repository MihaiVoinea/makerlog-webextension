<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit">
      <h1>Welcome to Makerlog!</h1>
      <span>Please log in:</span>
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" />
      <a href="https://getmakerlog.com/begin">Or register a new account!</a>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const status = await this.auth({
        username: this.username,
        password: this.password,
      });
      if (status) {
        await this.$store.restored;
        this.$router.push({ name: "home" });
      } else {
        this.username = "";
        this.password = "";
      }
    },
    ...mapActions(["auth"]),
  },
};
</script>

<style lang="scss" scoped>
h1,
span {
  text-align: center;
  font-family: Poppins;
}
h1 {
  color: var(--c-main);
  margin: 10px;
}
a {
  margin: 20px auto 10px auto;
}
span {
  margin: 10px auto;
}
input {
  margin-top: 10px;
  height: 16px;
  box-sizing: content-box;
  padding: 8px;
  border-radius: 8px;
  &[type="text"],
  &[type="password"] {
    border: 1px solid var(--c-border);
    &:focus {
      outline: none;

      border: 1px solid var(--c-main);
    }
  }
  &[type="submit"] {
    background: var(--c-main);
    color: white;
    border: none;
    &:focus {
      outline: none;

      background: var(--c-main-light);
    }
  }
}
form {
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 10px 10px rgba(4, 10, 28, 0.05);
}
.wrapper {
  background: var(--c-bg);
  height: 100vh;
  width: 100vw;
  position: absolute;
}
</style>
