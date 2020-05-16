<template>
  <div>
    <svg
      v-if="status === 'todo'"
      aria-hidden="true"
      data-prefix="far"
      data-icon="circle"
      class="svg-inline--fa fa-circle fa-w-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      color="#f39c12"
    >
      <path
        fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
      />
    </svg>
    <svg
      v-else-if="status === 'doing'"
      aria-hidden="true"
      data-prefix="fas"
      data-icon="dot-circle"
      class="svg-inline--fa fa-dot-circle fa-w-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      color="#f39c12"
    >
      <path
        fill="currentColor"
        d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
      />
    </svg>
    <svg
      v-else
      aria-hidden="true"
      data-prefix="fas"
      data-icon="check-circle"
      class="svg-inline--fa fa-check-circle fa-w-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      color="#27ae60"
    >
      <path
        fill="currentColor"
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
svg {
  width: 23px;
  height: 23px;
  margin: auto 0;
}
div {
  display: flex;
}
</style>

<script>
export default {
  name: "TaskIcon",
  props: ["status"],
};
</script>
