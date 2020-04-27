<template>
  <div
    id="icon"
    :class="{
      done: status === 'done',
      doing: status === 'doing',
      todo: status === 'todo',
    }"
  >
    <svg
      v-if="status === 'done'"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#fff"
        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
      />
    </svg>
    <svg
      v-if="status === 'doing'"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#fff"
        d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
      />
    </svg>
    <svg
      v-if="status === 'todo'"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#fff"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.done {
  background-color: #27ae60;
}

.doing {
  background-color: #f39c12;
}

.todo {
  background-color: #f39c12;
}
#icon {
  width: 100%;
  max-width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  svg {
    width: 32px;
    margin: auto;
  }
}
</style>

<script>
export default {
  props: ["status"],
};
</script>
