<script setup lang="ts">
import { useAppSettingsStore } from '@/stores/appSettings'
import TitleBar from '@/components/TitleBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import MainPage from '@/components/MainPage.vue'

const appSettings = useAppSettingsStore()

appSettings.setupAppSettings()
</script>

<template>
  <TitleBar />
  <div class="main">
    <NavigationBar />
    <MainPage />
  </div>
</template>

<style scoped>
.main {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: var(--bg-color);
}
</style>
