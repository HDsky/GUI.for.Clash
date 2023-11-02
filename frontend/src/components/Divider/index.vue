<script setup lang="ts">
// interface Props {}

// withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="divider">
    <div class="left line"></div>
    <div class="text">
      <slot />
    </div>
    <div class="right line"></div>
  </div>
</template>

<style lang="less" scoped>
.divider {
  display: flex;
  align-items: center;
  .line {
    flex: 1;
    border-top: 1px solid #000;
  }
  .text {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
