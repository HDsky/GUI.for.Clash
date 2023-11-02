import { ref, onMounted, onUnmounted, watch } from 'vue'
import { defineStore } from 'pinia'
import { parse, stringify } from 'yaml'
import { WindowSetDarkTheme, WindowSetLightTheme, Readfile, Writefile } from '@/utils/bridge'
import { debounce } from '@/utils'
import i18n from '@/lang'

export const useAppSettingsStore = defineStore('app-settings', () => {
  let firstOpen = true

  const app = ref<{
    lang: 'en' | 'zh'
    themeMode: 'auto' | 'dark' | 'light'
    profilesView: 'list' | 'grid'
    subscribesView: 'list' | 'grid'
    profile: string
  }>({
    lang: 'en',
    themeMode: 'auto',
    profilesView: 'grid',
    subscribesView: 'grid',
    profile: ''
  })

  const saveAppSettings = debounce(() => {
    console.log('save settings')
    Writefile('data/user.yaml', stringify(app.value))
  }, 3000)

  const setupAppSettings = async () => {
    try {
      const b = await Readfile('data/user.yaml')
      app.value = Object.assign(app.value, parse(b))
    } catch (error) {
      console.log(error)
    }
  }

  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

  const setAppTheme = (theme: 'dark' | 'light') => {
    document.body.setAttribute('theme-mode', theme)
    if (theme === 'dark') WindowSetDarkTheme()
    else WindowSetLightTheme()
  }

  const onSystemThemeChange = ({ matches }: MediaQueryListEvent) => {
    app.value.themeMode === 'auto' && setAppTheme(matches ? 'dark' : 'light')
  }

  onMounted(() => {
    mediaQueryList?.addEventListener('change', onSystemThemeChange)
  })

  onUnmounted(() => mediaQueryList?.removeEventListener('change', onSystemThemeChange))

  watch(
    app,
    (v) => {
      i18n.global.locale.value = v.lang

      if (mediaQueryList) {
        const mode =
          v.themeMode === 'auto' ? (mediaQueryList.matches ? 'dark' : 'light') : v.themeMode
        setAppTheme(mode)
      }

      if (!firstOpen) {
        saveAppSettings()
      }

      firstOpen = false
    },
    { immediate: true, deep: true }
  )

  return { setupAppSettings, app }
})
