<template>
  <div>登录页面</div>
</template>

<script lang="ts" setup>
  const { status, data, lastRefreshedAt, getSession, signIn, signOut } = useAuth()

  const credentials = { username: "jsmith", password: "hunter2" }

  // Trigger a signIn
  console.log(await signIn(credentials))
</script>

<style></style>
