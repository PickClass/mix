<template>
  <a-layout-header class="header flex justify-between">
    <div>
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapsed()" />
      <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed()" />
    </div>

    <a-dropdown>
      <div class="avatar">
        <a-avatar style="margin: 16px" icon="user" />
        <down-outlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">1st menu item</a-menu-item>
          <a-menu-item key="2">2nd menu item</a-menu-item>
          <a-menu-item key="3">3rd menu item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { useMyConfigStore } from "~/stores/config"
  const config = useMyConfigStore()
  // const { toggleCollapsed } = config
  // 由于 storeToRefs 提取的对象上不存在 toggleCollapsed 属性，分开提取
  const { collapsed } = storeToRefs(config)
  const { toggleCollapsed } = config

  const selectedKeys = ref<string[]>(["2"])
</script>

<style scoped>
  .header {
    background: #fff;
    padding: 0;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }

  .avatar {
    cursor: pointer;
  }
</style>
