<script setup lang="ts">
interface Props {
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emits = defineEmits(['update:modelValue', 'change'])

const toggle = () => {
  const state = !props.modelValue
  emits('update:modelValue', state)
  emits('change', state)
}
</script>

<template>
  <div
    @click="toggle"
    :style="{ 'justify-content': !modelValue ? 'flex-start' : 'flex-end' }"
    :class="modelValue ? 'on' : 'off'"
    class="switch"
  >
    <div class="dot"></div>
  </div>
</template>

<style lang="less" scoped>
.switch {
  cursor: pointer;
  width: 50px;
  height: 24px;
  display: flex;
  padding: 0 3px;
  align-items: center;
  border-radius: 24px;
  transition: all 0.2s;
  .dot {
    width: 19px;
    height: 19px;
    border-radius: 19px;
  }
}

.on {
  background-color: var(--switch-on-bg);
  .dot {
    background-color: var(--switch-on-dot-bg);
  }
}

.off {
  background-color: var(--switch-off-bg);
  .dot {
    background-color: var(--switch-off-dot-bg);
  }
}
</style>
