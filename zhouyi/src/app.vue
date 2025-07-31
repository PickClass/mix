<template>
  <div>
    <a-config-provider :getPopupContainer="getPopupContainer">
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </a-config-provider>
  </div>
</template>

<script lang="ts" setup>
  // 修改函数参数以匹配目标类型
  const getPopupContainer = (triggerNode?: HTMLElement | undefined): HTMLElement => {
    // 这里可以根据实际需求处理 triggerNode
    // 假设 dialogContext 相关逻辑无法直接使用，暂时直接返回 document.body
    return document.body
  }
</script>
