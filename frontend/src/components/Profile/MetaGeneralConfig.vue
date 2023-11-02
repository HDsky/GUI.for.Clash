<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { type ProfileType } from '@/stores/profiles'
import {
  FindProcessModeOptions,
  GeodataLoaderOptions,
  GlobalClientFingerprintOptions
} from '@/constant/kernel'
import { MetaGeneralConfigDefaults } from '@/constant/profile'
import Input from '@/components/Input/index.vue'
import Radio from '@/components/Radio/index.vue'
import Switch from '@/components/Switch/index.vue'
import Select from '@/components/Select/index.vue'

interface Props {
  modelValue: ProfileType['metaGeneralConfig']
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

const emits = defineEmits(['update:modelValue'])

const fields = ref(Object.assign({}, MetaGeneralConfigDefaults, props.modelValue))

const { t } = useI18n()

watch(fields, (v) => emits('update:modelValue', v), { immediate: true })
</script>

<template>
  <div class="common">
    <div class="item">
      {{ t('kernel.keep-alive-interval') }}
      <Input v-model="fields['keep-alive-interval']" />
    </div>
    <div class="item">
      {{ t('kernel.find-process-mode') }}
      <Radio v-model="fields['find-process-mode']" :options="FindProcessModeOptions" />
    </div>
    <div class="item">
      {{ t('kernel.external-controller-tls') }}
      <Input v-model="fields['external-controller-tls']" />
    </div>
    <div v-show="fields['external-controller-tls']" class="item">
      {{ t('kernel.tls.certificate') }}
      <Input v-model="fields.tls.certificate" />
    </div>
    <div v-show="fields['external-controller-tls']" class="item">
      {{ t('kernel.tls.private-key') }}
      <Input v-model="fields.tls['private-key']" />
    </div>
    <div class="item">
      {{ t('kernel.external-ui-name') }}
      <Input v-model="fields['external-ui-name']" />
    </div>
    <div class="item">
      {{ t('kernel.external-ui-url') }}
      <Input v-model="fields['external-ui-url']" />
    </div>
    <div class="item">
      {{ t('kernel.unified-delay') }}
      <Switch v-model="fields['unified-delay']" />
    </div>
    <div class="item">
      {{ t('kernel.tcp-concurrent') }}
      <Switch v-model="fields['tcp-concurrent']" />
    </div>
    <div class="item">
      {{ t('kernel.global-client-fingerprint') }}
      <Select
        v-model="fields['global-client-fingerprint']"
        :options="GlobalClientFingerprintOptions"
      />
    </div>
    <div class="item">
      {{ t('kernel.geodata-mode') }}
      <Switch v-model="fields['geodata-mode']" />
    </div>
    <div v-show="fields['geodata-mode']" class="item">
      {{ t('kernel.geodata-loader') }}
      <Radio v-model="fields['geodata-loader']" :options="GeodataLoaderOptions" />
    </div>
    <div v-show="fields['geodata-mode']" class="item">
      {{ t('kernel.geox-url.geoip') }}
      <Input v-model="fields['geox-url']['geoip']" />
    </div>
    <div v-show="fields['geodata-mode']" class="item">
      {{ t('kernel.geox-url.geosite') }}
      <Input v-model="fields['geox-url']['geosite']" />
    </div>
    <div v-show="fields['geodata-mode']" class="item">
      {{ t('kernel.geox-url.mmdb') }}
      <Input v-model="fields['geox-url']['mmdb']" />
    </div>
    <div class="item">
      {{ t('kernel.global-ua') }}
      <Input v-model="fields['global-ua']" />
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
}
</style>
