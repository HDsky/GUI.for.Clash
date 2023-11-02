<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type ProfileType, useProfilesStore } from '@/stores/profiles'
import { deepCloneJson } from '@/utils'
import { Notification } from '@/utils/bridge'
import { KernelOptions, Kernel } from '@/constant/kernel'
import Button from '@/components/Button/index.vue'
import Input from '@/components/Input/index.vue'
import Divider from '@/components/Divider/index.vue'
import Radio from '@/components/Radio/index.vue'
import GeneralConfig from '@/components/Profile/GeneralConfig.vue'
import MetaGeneralConfig from '@/components/Profile/MetaGeneralConfig.vue'
import PremiumGeneralConfig from '@/components/Profile/PremiumGeneralConfig.vue'
import TunConfig from '@/components/Profile/TunConfig.vue'
import DnsConfig from '@/components/Profile/DnsConfig.vue'
import ProxyGroupsConfig from '@/components/Profile/ProxyGroupsConfig.vue'
import RulesConfig from '@/components/Profile/RulesConfig.vue'

interface Props {
  profileId?: string
  isUpdate?: boolean
  showAction?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  profileId: '',
  isUpdate: false,
  showAction: true
})

const currentStep = ref(0)

const stepItems = [
  { title: 'profile.step.kernel' },
  { title: 'profile.step.general' },
  { title: 'profile.step.tun&dns' },
  { title: 'profile.step.groups' },
  { title: 'profile.step.rules' }
]

const showAdvancedSetting = ref(false)

const profile = ref<ProfileType>({
  id: '',
  name: '',
  kernel: Kernel.Clash,
  generalConfig: {},
  metaGeneralConfig: {},
  premiumGeneralConfig: {},
  tunConfig: {},
  dnsConfig: {},
  proxyGroupsConfig: [],
  rulesConfig: []
})

const isLatestStep = computed(() => currentStep.value === stepItems.length - 1)
const isMeta = computed(() => profile.value.kernel === Kernel.ClashMeta)
const isPremium = computed(() => profile.value.kernel === Kernel.ClashPremium)
const isClash = computed(() => profile.value.kernel === Kernel.Clash)

const { t } = useI18n()
const profilesStore = useProfilesStore()

const handleCancel = inject('cancel') as any

const handleSubmit = async () => {
  if (currentStep.value === 0 && !validateKernelName()) {
    return
  }

  if (isLatestStep.value) {
    if (props.isUpdate) {
      try {
        await profilesStore.editProfile(props.profileId, profile.value)
        handleCancel()
      } catch (error: any) {
        console.error('editProfile: ', error)
        Notification('editProfile', error)
        return
      }
    } else {
      try {
        await profilesStore.addProfile(profile.value)
        handleCancel()
      } catch (error: any) {
        Notification('addProfile', error)
        console.error('addProfile: ', error)
        return
      }
    }
  }

  currentStep.value++

  return true
}

const handlePrevStep = () => {
  currentStep.value--
}

const validateKernelName = () => {
  const { id, name } = profile.value

  if (!id) {
    profile.value.id = 'ID-' + Math.random()
  }

  if (!name) {
    return false
  }

  if (!props.isUpdate && profilesStore.profiles.find((v) => v.name === name)) {
    Notification('Error', name + ' ' + t('profile.alreadyExists'), '')
    return false
  }

  return true
}

if (props.isUpdate) {
  const p = profilesStore.profiles.find((v) => v.id === props.profileId)
  if (p) {
    profile.value = deepCloneJson(p)
  }
}

defineExpose({
  submit: handleSubmit,
  validate: validateKernelName
})
</script>

<template>
  <div class="profileform">
    <h3>{{ t(stepItems[currentStep].title) }}</h3>

    <div v-if="currentStep === 0" class="step1">
      <div class="form-item">
        <div class="name">
          {{ t('profiles.kernelType') }}
        </div>
        <Radio v-model="profile.kernel" :options="KernelOptions" />
      </div>
      <div class="form-item">
        <div class="name">* {{ t('profile.name') }}</div>
        <Input v-model="profile.name" auto-size class="input" />
      </div>
    </div>

    <div v-if="currentStep === 1" class="step2">
      <GeneralConfig v-model="profile.generalConfig" :kernel="profile.kernel" />
      <Divider>
        <Button
          v-if="isMeta || isPremium"
          type="text"
          @click="showAdvancedSetting = !showAdvancedSetting"
        >
          {{ t('profile.advancedSettings') }}
        </Button>
        <Button v-else type="text">
          {{ t('profile.notSupported') }}
        </Button>
      </Divider>
      <div v-if="showAdvancedSetting">
        <PremiumGeneralConfig v-if="isPremium" v-model="profile.premiumGeneralConfig" />
        <MetaGeneralConfig v-if="isMeta" v-model="profile.metaGeneralConfig" />
      </div>
    </div>

    <div v-if="currentStep === 2" class="step3">
      <div v-if="isMeta || isPremium">
        <Divider>TUN</Divider>
        <TunConfig v-model="profile.tunConfig" :kernel="profile.kernel" />
        <Divider>DNS</Divider>
      </div>
      <DnsConfig v-model="profile.dnsConfig" :kernel="profile.kernel" />
    </div>

    <div v-if="currentStep === 3" class="step4">
      <ProxyGroupsConfig v-model="profile.proxyGroupsConfig" />
    </div>

    <div v-if="currentStep === 4" class="setp5">
      <RulesConfig
        v-model="profile.rulesConfig"
        :proxy-groups="profile.proxyGroupsConfig"
        :kernel="profile.kernel"
        :profile="profile"
      />
    </div>
  </div>

  <div v-if="showAction" class="action">
    <Button @click="handleCancel">{{ t('common.cancel') }}</Button>
    <Button v-if="currentStep !== 0" @click="handlePrevStep">
      {{ t('common.prevStep') }}
    </Button>
    <Button @click="handleSubmit" type="primary">
      {{ isLatestStep ? t('common.save') : t('common.nextStep') }}
    </Button>
  </div>
</template>

<style lang="less" scoped>
.profileform {
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
}
.action {
  display: flex;
  justify-content: flex-end;
}
</style>
