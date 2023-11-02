<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Kernel, EnhancedModeOptions } from '@/constant/kernel'
import { DnsConfigDefaults } from '@/constant/profile'
import { type ProfileType } from '@/stores/profiles'
import Input from '@/components/Input/index.vue'
import Switch from '@/components/Switch/index.vue'
import Radio from '@/components/Radio/index.vue'
import InputList from '@/components/InputList/index.vue'

interface Props {
  modelValue: ProfileType['dnsConfig']
  kernel: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

const emits = defineEmits(['update:modelValue'])

const fields = ref(Object.assign({}, DnsConfigDefaults, props.modelValue))

const isMeta = computed(() => props.kernel === Kernel.ClashMeta)

const options = computed(() =>
  EnhancedModeOptions.filter((v) => v.support.includes(props.kernel as any))
)

const { t } = useI18n()

watch(fields, (v) => emits('update:modelValue', v), { immediate: true })

watch(
  () => fields.value.enable,
  (v) => {
    if (v && props.kernel !== Kernel.ClashMeta) {
      fields.value['enhanced-mode'] = 'fake-ip'
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="common">
    <div class="item">
      {{ t('kernel.dns.enable') }}
      <Switch v-model="fields.enable" />
    </div>
    <div v-show="fields.enable">
      <div v-if="isMeta" class="item">
        {{ t('kernel.dns.prefer-h3') }}
        <Switch v-model="fields['prefer-h3']" />
      </div>
      <div class="item">
        {{ t('kernel.dns.ipv6') }}
        <Switch v-model="fields['ipv6']" />
      </div>
      <div class="item">
        {{ t('kernel.dns.enhanced-mode') }}
        <Radio v-model="fields['enhanced-mode']" :options="options" />
      </div>
      <div class="item">
        {{ t('kernel.dns.fake-ip-range') }}
        <Input v-model="fields['fake-ip-range']" />
      </div>
      <div class="item" :class="{ 'flex-start': fields['nameserver'].length !== 0 }">
        {{ t('kernel.dns.nameserver') }}
        <InputList v-model="fields['nameserver']" />
      </div>
      <div class="item" :class="{ 'flex-start': fields['fake-ip-filter'].length !== 0 }">
        {{ t('kernel.dns.fake-ip-filter') }}
        <InputList v-model="fields['fake-ip-filter']" />
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
  .flex-start {
    align-items: flex-start;
  }
}
</style>
