<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscribesStore } from '@/stores/subscribes'
import Modal from '@/components/Modal/index.vue'
import Button from '@/components/Button/index.vue'
import QuickStartView from './QuickStartView.vue'

const { t } = useI18n()

const showQuickStart = ref(false)
</script>

<template>
  <div class="overview">
    <div class="quick-start">
      <img src="@/assets/logo.png" draggable="false" />
      <p>{{ t('home.noProfile') }}</p>
      <Button type="primary" @click="showQuickStart = true">
        {{ t('home.quickStart') }}
      </Button>
    </div>
  </div>

  <Modal v-model:open="showQuickStart" title="Quick Start" :footer="false">
    <QuickStartView />
  </Modal>
</template>

<style lang="less" scoped>
.overview {
  .quick-start {
    display: flex;
    min-height: 66vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-bottom: 20px;
    }
  }
}
</style>
