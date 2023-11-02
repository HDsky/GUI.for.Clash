<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppSettingsStore } from '@/stores/appSettings'
import Radio from '@/components/Radio/index.vue'

const { t } = useI18n()
const appSettings = useAppSettingsStore()

const themes = [
  {
    label: 'settings.theme.dark',
    value: 'dark'
  },
  {
    label: 'settings.theme.light',
    value: 'light'
  },
  {
    label: 'settings.theme.auto',
    value: 'auto'
  }
]

const langs = [
  {
    label: 'settings.lang.zh',
    value: 'zh'
  },
  {
    label: 'settings.lang.en',
    value: 'en'
  }
]
</script>

<template>
  <div class="settings">
    <h3>{{ t('settings.theme.name') }}</h3>
    <Radio v-model="appSettings.app.themeMode" :options="themes" />
    <h3>{{ t('settings.lang.name') }}</h3>
    <Radio v-model="appSettings.app.lang" :options="langs" />
  </div>
</template>

<style lang="less" scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
