<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: string
  options: { label: string; value: string }[]
}

withDefaults(defineProps<Props>(), {
  options: () => []
})

const emits = defineEmits(['update:modelValue'])

const { t } = useI18n()

const handleChange = (val: string) => {
  emits('update:modelValue', val)
}
</script>

<template>
  <div class="radio">
    <div
      v-for="o in options"
      :key="o.value"
      @click="handleChange(o.value)"
      class="radio-button"
      :class="{ active: o.value === modelValue }"
    >
      {{ t(o.label) }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.radio {
  display: inline-flex;
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
  font-size: 12px;
  &-button {
    cursor: pointer;
    color: var(--radio-normal-color);
    background-color: var(--radio-normal-bg);
    padding: 6px 12px;
    border-left: 1px solid gray;
    &:nth-child(1) {
      border-left: none;
    }
    &:hover {
      color: var(--radio-normal-hover-color);
    }
  }
  .active {
    color: red;
    color: var(--radio-primary-color);
    background-color: var(--radio-primary-bg);
    &:hover {
      background-color: var(--radio-primary-hover-bg);
    }
    &:active {
      background-color: var(--radio-primary-active-bg);
    }
  }
}
</style>
