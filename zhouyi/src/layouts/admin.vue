<template>
  <a-layout style="min-height: 100vh">
    <layoutSider />

    <a-layout>
      <layoutHeader />
      <tabs />
      <a-layout-content class="main ">
        Content
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  import layoutHeader from "~/layouts/components/admin/header.vue"
  import layoutSider from "~/layouts/components/admin/sider.vue"
  import tabs from "~/layouts/components/admin/tabs.vue"
</script>
<style scoped>
  .main {
    margin: 20px;
    /* background-color: #fff; */
  }
</style>
