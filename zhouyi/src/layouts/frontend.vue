<template>
  <a-layout class="layout">
    <headers />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <breadcrumb />
      <slot></slot>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">Content</div>
    </a-layout-content>
    <footers />
  </a-layout>
</template>
<script lang="ts" setup>
  import headers from "./components/frontend/header.vue";
  import footers from "./components/frontend/footer.vue";
  import breadcrumb from "./components/frontend/breadcrumb.vue";
  import { ref } from "vue";
</script>
<style scoped>
  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
  }

  [data-theme="dark"] .site-layout-content {
    background: #141414;
  }
</style>
