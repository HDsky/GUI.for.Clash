<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { type ProfileType } from '@/stores/profiles'
import { PremiumGeneralConfigDefaults } from '@/constant/profile'
import Switch from '@/components/Switch/index.vue'
import InputList from '@/components/InputList/index.vue'

interface Props {
  modelValue: ProfileType['premiumGeneralConfig']
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

const emits = defineEmits(['update:modelValue'])

const fields = ref(Object.assign({}, PremiumGeneralConfigDefaults, props.modelValue))

const { t } = useI18n()

watch(fields, (v) => emits('update:modelValue', v), { immediate: true })
</script>

<template>
  <div class="common">
    <div class="item">
      {{ t('kernel.tracing') }}
      <Switch v-model="fields.profile.tracing" />
    </div>
    <div class="item">
      {{ t('kernel.sniff-tls-sni') }}
      <Switch v-model="fields.experimental['sniff-tls-sni']" />
    </div>
    <div class="item" :class="{ 'flex-start': fields.ebpf['redirect-to-tun'].length !== 0 }">
      {{ t('kernel.redirect-to-tun') }}
      <InputList v-model="fields.ebpf['redirect-to-tun']" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.common {
  .item {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-start {
    align-items: flex-start;
  }
}
</style>
