<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { GeneralConfigDefaults } from '@/constant/profile'
import { type ProfileType } from '@/stores/profiles'
import { ModeOptions, LogLevelOptions, Kernel } from '@/constant/kernel'
import Input from '@/components/Input/index.vue'
import Radio from '@/components/Radio/index.vue'
import Switch from '@/components/Switch/index.vue'

interface Props {
  modelValue: ProfileType['generalConfig']
  kernel: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

const emits = defineEmits(['update:modelValue'])

const fields = ref(Object.assign({}, GeneralConfigDefaults, props.modelValue))

const isClash = computed(() => props.kernel === Kernel.Clash)

const { t } = useI18n()

watch(fields, (v) => emits('update:modelValue', v), { immediate: true })
</script>

<template>
  <div class="common">
    <div class="item">
      {{ t('kernel.mode') }}
      <Radio v-model="fields.mode" :options="ModeOptions" />
    </div>
    <div class="item">
      {{ t('kernel.log-level') }}
      <Radio v-model="fields['log-level']" :options="LogLevelOptions" />
    </div>
    <div class="item">
      {{ t('kernel.ipv6') }}
      <Switch v-model="fields.ipv6" />
    </div>
    <div class="item">
      {{ t('kernel.allow-lan') }}
      <Switch v-model="fields['allow-lan']" />
    </div>
    <div class="item">
      {{ t('kernel.port') }}
      <Input v-model="fields.port" />
    </div>
    <div class="item">
      {{ t('kernel.socks-port') }}
      <Input v-model="fields['socks-port']" />
    </div>
    <div class="item">
      {{ t('kernel.mixed-port') }}
      <Input v-model="fields['mixed-port']" />
    </div>
    <div class="item">
      {{ t('kernel.external-controller') }}
      <Input v-model="fields['external-controller']" placeholder="127.0.0.1:9090" />
    </div>
    <div class="item">
      {{ t('kernel.external-ui') }}
      <Input v-model="fields['external-ui']" placeholder="ui" />
    </div>
    <div v-show="!isClash" class="item">
      {{ t('kernel.interface-name') }}
      <Input v-model="fields['interface-name']" />
    </div>
    <div class="item">
      {{ t('kernel.secret') }}
      <Input v-model="fields.secret" />
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
