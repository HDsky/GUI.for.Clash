<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '@/components/Button/index.vue'
import Radio from '@/components/Radio/index.vue'
import SubscribeForm from '@/views/SubscribesView/components/SubscribeForm.vue'

const currentStep = ref(2)
const stepItems = [
  { title: 'Select Kernel' },
  { title: 'Add A Subscribe' },
  { title: 'Add A Profile' }
]
const subscribeFormRef = ref()

const kernel = ref('clash')
const kernelOptions = [
  { label: 'settings.clash.name', value: 'clash' },
  { label: 'settings.clashPremium.name', value: 'clash-premium' },
  { label: 'settings.clashMeta.name', value: 'Clash.Meta' }
]

const { t } = useI18n()

const handleCancel = inject('cancel') as any

const handleSubmit = async () => {
  if (currentStep.value === 1) {
    const ok = await subscribeFormRef.value.validate()
    if (!ok) {
      return
    }
  }
  currentStep.value++
}

const isDone = computed(() => currentStep.value === stepItems.length - 1)
</script>

<template>
  <div v-show="currentStep === 0" class="step1">
    <h4>{{ stepItems[0].title }}</h4>
    <Radio v-model="kernel" :options="kernelOptions" />
  </div>

  <div v-show="currentStep === 1" class="step2">
    <h4>{{ stepItems[1].title }}</h4>
    <SubscribeForm ref="subscribeFormRef" :show-action="false" />
  </div>

  <div v-show="currentStep === 2" class="step3">
    <h4>{{ stepItems[2].title }}</h4>
    add profile
  </div>

  <div class="action">
    <Button @click="handleCancel">{{ t('modal.cancel') }}</Button>
    <Button v-if="currentStep !== 0" @click="currentStep--" type="primary"> Prev </Button>
    <Button @click="handleSubmit" type="primary">{{ isDone ? 'Done' : 'Next' }}</Button>
  </div>
</template>

<style lang="less" scoped>
.action {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
