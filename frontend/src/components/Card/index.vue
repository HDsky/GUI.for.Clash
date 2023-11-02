<script setup lang="ts">
import Icon from '@/components/Icon/index.vue'
interface Props {
  title?: string
  subtitle?: string
  selected?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="card">
    <div
      v-if="$slots['extra'] || $slots['title-prefix'] || $slots['title-suffix'] || title"
      class="header"
    >
      <slot name="title-prefix" />
      <div v-if="title" class="title">{{ title }}</div>
      <slot name="title-suffix" />
      <div class="extra">
        <slot name="extra" />
      </div>
    </div>
    <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
    <slot />
    <Icon v-if="selected" class="status" icon="selected" fill="var(--color-primary)" />
    <Icon v-if="disabled" class="status" icon="disabled" fill="var(--color-primary)" />
  </div>
</template>

<style lang="less" scoped>
.card {
  position: relative;
  color: var(--card-color);
  background-color: var(--card-bg);
  padding: 0 8px 8px 8px;
  border-radius: 8px;
  &:hover {
    background-color: var(--card-hover-bg);
  }
  &:active {
    background-color: var(--card-active-bg);
  }
  .header {
    display: flex;
    align-items: center;
    padding: 8px 0;
    .title {
      color: var(--card-color);
      font-size: 16px;
      font-weight: bold;
    }
    .extra {
      margin-left: auto;
    }
  }
  .status {
    position: absolute;
    right: 8px;
    bottom: 4px;
  }
}
</style>
