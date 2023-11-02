<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@/components/Tabs/index.vue'
import AboutView from '@/views/AboutView.vue'
import DebugView from '../DebugView.vue'
import GeneralSetting from './components/GeneralSetting.vue'
import KernelView from '@/views/KernelView.vue'
import ComponentsView from '@/views/ComponentsView.vue'

const settings = [
  { key: 'general', tab: 'settings.general' },
  { key: 'kernel', tab: 'router.kernel' },
  { key: 'debug', tab: 'router.debug' },
  { key: 'about', tab: 'router.about' },
  { key: 'components', tab: 'router.components' }
]

const activeKey = ref(settings[0].key)
</script>

<template>
  <Tabs v-model:active-key="activeKey" :items="settings">
    <template #general>
      <GeneralSetting />
    </template>

    <template #about>
      <AboutView />
    </template>

    <template #debug>
      <DebugView />
    </template>

    <template #kernel>
      <KernelView />
    </template>

    <template #components>
      <ComponentsView />
    </template>
  </Tabs>
</template>

<style lang="less" scoped></style>
