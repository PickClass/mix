<template>
  <h1>你好这是前端月末</h1>
</template>

<script lang="ts" setup>
  const { data } = await useFetch("/api/hello")
  console.log(data.value)

  console.log(import.meta.url)
</script>

<style></style>
