<script setup lang="ts">
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProfilesStore } from '@/stores/profiles'
import { type SubscribeType, useSubscribesStore } from '@/stores/subscribes'
import { deepCloneJson } from '@/utils'
import { Notification } from '@/utils/bridge'
import Button from '@/components/Button/index.vue'
import Input from '@/components/Input/index.vue'
import Radio from '@/components/Radio/index.vue'
import Divider from '@/components/Divider/index.vue'

interface Props {
  subId?: string
  isUpdate?: boolean
  showAction?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  subId: '',
  isUpdate: false,
  showAction: true
})

let oldSubName = ''
const showMore = ref(false)
const subType = ref<'Http' | 'File'>('Http')

const sub = ref<SubscribeType>({
  id: '',
  name: '',
  upload: 0,
  download: 0,
  total: 0,
  expire: '',
  updateTime: '',
  type: 'Http',
  url: '',
  website: '',
  path: 'data/subscribes/.yaml',
  include: '',
  exclude: '',
  disabled: false
})

const { t } = useI18n()
const subscribeStore = useSubscribesStore()
const profilesStore = useProfilesStore()

profilesStore.setupProfiles()

const handleCancel = inject('cancel') as any

const handleSubmit = async () => {
  if (!validate()) {
    return false
  }

  if (props.isUpdate) {
    try {
      await subscribeStore.editSubscribe(props.subId, sub.value)
      updateProfilesReferences()
      handleCancel()
    } catch (error: any) {
      console.error('editSubscribe: ', error)
      Notification('editSubscribe', error)
    }
  } else {
    try {
      await subscribeStore.addSubscribe(sub.value)
      handleCancel()
    } catch (error: any) {
      Notification('addSubscribe', error)
      console.error('addSubscribe: ', error)
    }
  }

  return true
}

const validate = () => {
  const { id, name, url, path } = sub.value

  if (!id) {
    sub.value.id = 'ID-' + Math.random()
  }

  if (
    (subType.value === 'Http' && (!name || !url || !path)) ||
    (subType.value === 'File' && (!name || !path))
  ) {
    return false
  }

  sub.value.type = subType.value

  return true
}

const updateProfilesReferences = () => {
  profilesStore.profiles.forEach((profile) => {
    const needUpdate = profile.proxyGroupsConfig.some((group) => group.use.includes(oldSubName))
    if (needUpdate) {
      profile.proxyGroupsConfig.forEach((group) => {
        group.use = group.use.map((v) => (v === oldSubName ? sub.value.name : v))
      })
      try {
        profilesStore.saveProfiles()
      } catch (error) {
        console.log(error)
      }
    }
  })
}

if (props.isUpdate) {
  const s = subscribeStore.subscribes.find((v) => v.id === props.subId)
  if (s) {
    oldSubName = s.name
    sub.value = deepCloneJson(s)
    subType.value = sub.value.type
  }
}

defineExpose({
  submit: handleSubmit,
  validate
})
</script>

<template>
  <div class="subform">
    <div class="form-item row">
      <div class="name">
        {{ t('subscribes.subtype') }}
      </div>
      <Radio
        v-model="subType"
        :options="[
          { label: 'subscribe.http', value: 'Http' },
          { label: 'subscribe.file', value: 'File' }
        ]"
      />
    </div>
    <div class="form-item">
      <div class="name">* {{ t('subscribe.name') }}</div>
      <Input v-model="sub.name" auto-size class="input" />
    </div>
    <div class="form-item">
      <div class="name">* {{ t('subscribe.url') }}</div>
      <Input
        v-model="sub.url"
        auto-size
        :placeholder="subType === 'Http' ? 'http(s)://' : 'data/local/{filename}.txt'"
        class="input"
      />
    </div>
    <div class="form-item">
      <div class="name">* {{ t('subscribe.path') }}</div>
      <Input
        v-model="sub.path"
        auto-size
        placeholder="data/subscribes/{filename}.yaml"
        class="input"
      />
    </div>
    <Divider>
      <Button @click="showMore = !showMore" type="text">
        {{ t('common.more') }}
      </Button>
    </Divider>
    <div v-show="showMore">
      <div class="form-item">
        <div class="name">{{ t('subscribe.include') }}</div>
        <Input v-model="sub.include" auto-size placeholder="keyword1|keyword2" class="input" />
      </div>
      <div class="form-item">
        <div class="name">{{ t('subscribe.exclude') }}</div>
        <Input v-model="sub.exclude" auto-size placeholder="keyword1|keyword2" class="input" />
      </div>
      <div v-if="subType === 'Http'" class="form-item">
        <div class="name">
          {{ t('subscribe.website') }}
        </div>
        <Input v-model="sub.website" auto-size placeholder="http(s)://" class="input" />
      </div>
    </div>
  </div>
  <div v-if="showAction" class="action">
    <Button @click="handleCancel">{{ t('common.cancel') }}</Button>
    <Button @click="handleSubmit" type="primary">{{ t('common.save') }}</Button>
  </div>
</template>

<style lang="less" scoped>
.subform {
  .form-item {
    margin-bottom: 8px;
    .name {
      font-size: 14px;
      padding: 8px 0;
    }
    .input {
      width: 100%;
    }
  }
  .row {
    display: flex;
    align-items: center;
    .name {
      margin-right: 8px;
    }
  }
}
.action {
  display: flex;
  justify-content: flex-end;
}
</style>
