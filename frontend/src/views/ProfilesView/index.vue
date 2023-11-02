<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n, I18nT } from 'vue-i18n'
import { type ProfileType, useProfilesStore } from '@/stores/profiles'
import { useAppSettingsStore } from '@/stores/appSettings'
import { Getcwd, Notification } from '@/utils/bridge'
import { BrowserOpenURL } from '@/utils/bridge'
import { Kernel } from '@/constant/kernel'
import Button from '@/components/Button/index.vue'
import Dropdown from '@/components/Dropdown/index.vue'
import Card from '@/components/Card/index.vue'
import Radio from '@/components/Radio/index.vue'
import Modal from '@/components/Modal/index.vue'
import Icon from '@/components/Icon/index.vue'
import ProfileForm from './components/ProfileForm.vue'

const showProfileForm = ref(false)
const profileFormProfileID = ref()
const profileFormIsUpdate = ref(false)
const profileFormTitle = computed(() =>
  profileFormIsUpdate.value ? t('common.edit') : t('common.add')
)

const { t } = useI18n()
const profilesStore = useProfilesStore()
const appSettingsStore = useAppSettingsStore()

profilesStore.setupProfiles()

const handleAddProfile = async () => {
  profileFormIsUpdate.value = false
  showProfileForm.value = true
}

const handleEditProfile = (p: ProfileType) => {
  profileFormIsUpdate.value = true
  profileFormProfileID.value = p.id
  showProfileForm.value = true
}

const handleOpenEdit = async () => {
  const cwd = await Getcwd()
  BrowserOpenURL(cwd + '/data/profiles.yaml')
}

const handleDeleteProfile = async (p: ProfileType) => {
  try {
    await profilesStore.deleteProfile(p.id)
  } catch (error: any) {
    console.error('deleteProfile: ', error)
    Notification('deleteProfile', error)
  }
}

const handleUseProfile = async (p: ProfileType) => {
  appSettingsStore.app.profile = p.name
}
</script>

<template>
  <div v-if="profilesStore.profiles.length !== 0" class="header">
    <Radio
      v-model="appSettingsStore.app.profilesView"
      :options="[
        { label: 'common.grid', value: 'grid' },
        { label: 'common.list', value: 'list' }
      ]"
    />
    <Button @click="handleAddProfile" type="primary" style="margin-left: auto">
      {{ t('common.add') }}
    </Button>
  </div>

  <div v-if="profilesStore.profiles.length === 0" class="empty">
    <I18nT keypath="profiles.empty" tag="p">
      <template #action>
        <Button @click="handleAddProfile" type="link">{{ t('common.add') }}</Button>
      </template>
    </I18nT>
  </div>

  <div class="profiles" :class="appSettingsStore.app.profilesView">
    <Card
      v-for="p in profilesStore.profiles"
      :key="p.name"
      :title="p.name"
      :selected="appSettingsStore.app.profile === p.name"
      @dblclick="handleUseProfile(p)"
      class="profile"
    >
      <template #title-suffix>
        <Icon icon="edit" @click="handleOpenEdit" style="cursor: pointer" />
      </template>

      <template v-if="appSettingsStore.app.profilesView === 'grid'" #extra>
        <Dropdown>
          <Button type="link" size="small">
            {{ t('common.more') }}
          </Button>
          <template #overlay>
            <Button type="link" size="small" @click="handleUseProfile(p)">
              {{ t('common.use') }}
            </Button>
            <Button type="link" size="small" @click="handleEditProfile(p)">
              {{ t('common.edit') }}
            </Button>
            <Button type="link" size="small" @click="handleDeleteProfile(p)">
              {{ t('common.delete') }}
            </Button>
          </template>
        </Dropdown>
      </template>

      <template v-else #extra>
        <Button type="link" size="small" @click="handleUseProfile(p)">
          {{ t('common.use') }}
        </Button>
        <Button type="link" size="small" @click="handleEditProfile(p)">
          {{ t('common.edit') }}
        </Button>
        <Button type="link" size="small" @click="handleDeleteProfile(p)">
          {{ t('common.delete') }}
        </Button>
      </template>
      <div>
        {{ t('profiles.kernelType') }}
        :
        {{ p.kernel }}
      </div>
      <div>
        proxy groups:
        {{ p.proxyGroupsConfig.length }}
        / rules:
        {{ p.rulesConfig.length }}
      </div>
      <div>
        TUN:
        {{
          p.kernel === Kernel.Clash
            ? t('common.notSupported')
            : p.tunConfig?.enable
            ? t('common.enabled')
            : t('common.disabled')
        }}
        / DNS:
        {{ p.dnsConfig?.enable ? t('common.enabled') : t('common.disabled') }}
      </div>
    </Card>
  </div>

  <Modal v-model:open="showProfileForm" :title="profileFormTitle" :footer="false" max-height="80">
    <ProfileForm :is-update="profileFormIsUpdate" :profile-id="profileFormProfileID" />
  </Modal>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 8px 8px 8px;
}

.empty {
  text-align: center;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profiles {
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  line-height: 1.6;
}

.grid {
  .profile {
    width: calc(33.333333% - 16px);
    margin: 8px;
  }
}
.list {
  .profile {
    width: 100%;
    margin: 8px;
  }
}
</style>
