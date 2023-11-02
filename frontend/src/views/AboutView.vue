<script setup lang="ts">
import { APP_TITLE, APP_VERSION } from '@/utils/env'
</script>

<template>
  <div class="about">
    <img src="@/assets/logo.png" draggable="false" />
    <div class="appname">{{ APP_TITLE }}</div>
    <div class="appver">{{ APP_VERSION }}</div>
  </div>
</template>

<style lang="less" scoped>
.about {
  padding: 22px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .appname {
    font-weight: bold;
    font-size: 16px;
    line-height: 4;
  }
}
</style>
