<script setup lang="ts">
import { computed, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '@/components/Button/index.vue'

interface Props {
  open: boolean
  title?: string
  footer?: boolean
  maxHeight?: string
  maxWidth?: string
  minWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  footer: true,
  maxHeight: '',
  maxWidth: '',
  minWidth: '60'
})

const { t } = useI18n()

const emits = defineEmits(['update:open', 'ok'])

const handleSubmit = () => {
  emits('update:open', false)
  emits('ok')
}

const handleCancel = () => {
  emits('update:open', false)
}

const contentStyle = computed(() => ({
  maxHeight: props.maxHeight + '%',
  maxWidth: props.maxWidth + '%',
  minWidth: props.minWidth + '%'
}))

provide('cancel', handleCancel)
</script>

<template>
  <div v-if="open" class="modal" style="--wails-draggable: drag">
    <div :style="contentStyle" class="content" style="--wails-draggable: false">
      <div class="title">{{ title }}</div>
      <div class="slot">
        <slot />
      </div>
      <div v-if="footer" class="action">
        <Button @click="handleCancel">{{ t('common.cancel') }}</Button>
        <Button @click="handleSubmit" type="primary">{{ t('common.save') }}</Button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--modal-mask-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);

  .content {
    background-color: var(--modal-bg);
    padding: 16px 16px 0 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .slot {
      padding: 8px 0 8px 0;
    }
    .action {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
    }
  }
}
</style>
