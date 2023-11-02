<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { type ProfileType } from '@/stores/profiles'
import { StackOptions, Kernel } from '@/constant/kernel'
import { TunConfigDefaults } from '@/constant/profile'
import Input from '@/components/Input/index.vue'
import Radio from '@/components/Radio/index.vue'
import Switch from '@/components/Switch/index.vue'

interface Props {
  modelValue: ProfileType['tunConfig']
  kernel: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

const emits = defineEmits(['update:modelValue'])

const fields = ref(Object.assign({}, TunConfigDefaults, props.modelValue))

const isMeta = computed(() => props.kernel === Kernel.ClashMeta)

const { t } = useI18n()

watch(fields, (v) => emits('update:modelValue', v), { immediate: true })
</script>

<template>
  <div class="common">
    <div class="item">
      {{ t('kernel.tun.enable') }}
      <Switch v-model="fields.enable" />
    </div>
    <div v-show="fields.enable">
      <div class="item">
        {{ t('kernel.tun.stack') }}
        <Radio v-model="fields.stack" :options="StackOptions" />
      </div>
      <div class="item">
        {{ t('kernel.tun.auto-route') }}
        <Switch v-model="fields['auto-route']" />
      </div>
      <div class="item">
        {{ t('kernel.tun.auto-detect-interface') }}
        <Switch v-model="fields['auto-detect-interface']" />
      </div>
      <div v-if="isMeta" class="item">
        {{ t('kernel.tun.device') }}
        <Input v-model="fields['device']" />
      </div>
      <div v-if="isMeta" class="item">
        {{ t('kernel.tun.mtu') }}
        <Input v-model="fields['mtu']" />
      </div>
      <div v-if="isMeta" class="item">
        {{ t('kernel.tun.strict-route') }}
        <Switch v-model="fields['strict-route']" />
      </div>
      <div v-if="isMeta" class="item">
        {{ t('kernel.tun.endpoint-independent-nat') }}
        <Switch v-model="fields['endpoint-independent-nat']" />
      </div>
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
