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

const handleChange = (e: any) => {
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="select">
    <select :value="modelValue" @change="($event) => handleChange($event)">
      <option v-for="o in options" :key="o.value" :value="o.value">
        {{ t(o.label) }}
      </option>
    </select>
  </div>
</template>

<style lang="less" scoped>
.select {
  min-width: 120px;
  display: inline-block;
  border: 1px solid #999999;
  border-radius: 8px;
  font-size: 12px;
  background-color: #fff;
  select {
    cursor: pointer;
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    outline: none;
    border: none;
  }
}
</style>
