<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { deepCloneJson } from '@/utils'
import { generateRule } from '@/utils/generator'
import { type ProfileType } from '@/stores/profiles'
import { RulesTypeOptions, Kernel } from '@/constant/kernel'
import Input from '@/components/Input/index.vue'
import Switch from '@/components/Switch/index.vue'
import Card from '@/components/Card/index.vue'
import Button from '@/components/Button/index.vue'
import Modal from '@/components/Modal/index.vue'
import Select from '@/components/Select/index.vue'
import Divider from '@/components/Divider/index.vue'

type RulesType = ProfileType['rulesConfig']

interface Props {
  modelValue: RulesType
  kernel: string
  proxyGroups: ProfileType['proxyGroupsConfig']
  profile: ProfileType
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const emits = defineEmits(['update:modelValue'])

let dragIndex = -1
let updateRuleId = 0
const showModal = ref(false)
const showNotSupportModal = ref(false)
const rules = ref<RulesType>(deepCloneJson(props.modelValue))

const fields = ref({
  type: 'DOMAIN',
  payload: '',
  proxy: '',
  'no-resolve': false,
  filter: ''
})

const proxyOptions = computed(() => [
  { label: 'DIRECT', value: 'DIRECT' },
  { label: 'REJECT', value: 'REJECT' },
  ...props.proxyGroups.map(({ name }) => ({ label: name || '', value: name || '' }))
])

const supportNoResolve = computed(() =>
  ['GEOIP', 'IP-CIDR', 'IP-CIDR6', 'SCRIPT'].includes(fields.value.type)
)

const supportPayload = computed(() => fields.value.type !== 'MATCH')

const supportRule = (type: string) => {
  if (props.kernel === Kernel.ClashMeta && !props.profile.metaGeneralConfig?.['geodata-mode']) {
    return !['GEOSITE'].includes(type)
  }
  return typeOptions.value.find((v) => v.value === type)
}

const typeOptions = computed(() =>
  RulesTypeOptions.filter((v) => v.support.includes(props.kernel as any))
)

const { t } = useI18n()

const handleAddRule = () => {
  updateRuleId = -1
  fields.value = {
    type: 'DOMAIN',
    payload: '',
    proxy: '',
    'no-resolve': false,
    filter: ''
  }
  showModal.value = true
}

const handleDeleteRule = (index: number) => {
  rules.value.splice(index, 1)
}

const handleEditRule = (index: number) => {
  updateRuleId = index
  fields.value = deepCloneJson(rules.value[index])
  showModal.value = true
}

const handleAddEnd = () => {
  if (updateRuleId !== -1) {
    rules.value[updateRuleId] = fields.value
  } else {
    rules.value.push(fields.value)
  }
}

const handleShowNotSupportDetail = (r: RulesType[0]) => {
  fields.value = r
  showNotSupportModal.value = true
}

const onDragStart = (e: any, index: number) => {
  dragIndex = index
}

const onDragEnter = (e: any, index: number) => {
  e.preventDefault()
  if (dragIndex !== index) {
    const source = rules.value[dragIndex]
    rules.value.splice(dragIndex, 1)
    rules.value.splice(index, 0, source)
    dragIndex = index
  }
}

const onDragOver = (e: any) => e.preventDefault()

watch(
  rules,
  (v) => {
    emits('update:modelValue', v)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>
    <TransitionGroup name="drag" tag="div">
      <Card
        v-for="(r, index) in rules"
        :key="r.payload"
        @dragenter="onDragEnter($event, index)"
        @dragover="onDragOver($event)"
        @dragstart="onDragStart($event, index)"
        class="rules-item"
        draggable="true"
      >
        <div class="name">
          <span
            v-if="!supportRule(r.type)"
            @click="handleShowNotSupportDetail(r)"
            class="not-support"
            >[ ! ]</span
          >
          {{ generateRule(r) }}
        </div>
        <div class="action">
          <Button @click="handleEditRule(index)" v-if="supportRule(r.type)" type="text">
            {{ t('common.edit') }}
          </Button>
          <Button @click="handleDeleteRule(index)" type="text">{{ t('common.delete') }}</Button>
        </div>
      </Card>
    </TransitionGroup>

    <div style="display: flex; justify-content: center">
      <Button type="link" @click="handleAddRule">{{ t('common.add') }}</Button>
    </div>

    <Modal v-model:open="showModal" @ok="handleAddEnd" max-width="80" max-height="80">
      <div class="form">
        <div class="item">
          {{ t('kernel.rules.type.name') }}
          <Select v-model="fields.type" :options="typeOptions" />
        </div>
        <div v-show="supportPayload" class="item">
          {{ t('kernel.rules.payload') }}
          <Input v-model="fields.payload" />
        </div>
        <div class="item">
          {{ t('kernel.rules.proxy') }}
          <Select v-model="fields.proxy" :options="proxyOptions" />
        </div>
        <div v-show="supportNoResolve" class="item">
          {{ t('kernel.rules.no-resolve') }}
          <Switch v-model="fields['no-resolve']" />
        </div>
      </div>
    </Modal>

    <Modal v-model:open="showNotSupportModal" :footer="false">
      <Divider> {{ t('common.warning') }} </Divider>
      <p>{{ t('kernel.rules.notSupported') }}</p>
      <div style="display: flex; justify-content: flex-end">
        <Button @click="showNotSupportModal = false">{{ t('common.cancel') }}</Button>
      </div>
    </Modal>
  </div>
</template>

<style lang="less" scoped>
.form {
  .item {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.drag-move {
  transition: transform 0.2s;
}
.rules-item {
  display: flex;
  align-items: center;
  padding: 0 8px;
  .name {
    font-size: 14px;
    font-weight: bold;
    .not-support {
      color: rgb(200, 193, 11);
      cursor: pointer;
    }
  }
  .action {
    margin-left: auto;
  }
}
</style>
