<script setup lang="ts">
interface Props {
  modelValue: string | number
  autoSize?: boolean
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  autoSize: false
})

const emits = defineEmits(['update:modelValue'])

const onInput = (e: any) => {
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="input">
    <input
      :class="{ 'auto-size': autoSize }"
      :value="modelValue"
      :placeholder="placeholder"
      @input="($event) => onInput($event)"
      type="text"
    />
  </div>
</template>

<style lang="less" scoped>
.input {
  input {
    width: 160px;
    display: inline-block;
    padding: 6px 8px;
    border: 1px solid gray;
    border-radius: 4px;
  }
  .auto-size {
    width: 100%;
  }
}
</style>
