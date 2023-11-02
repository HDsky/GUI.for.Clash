<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Download, UnzipZIPFile, HttpGetJSON, Notification, HttpGet, Exec } from '@/utils/bridge'
import Tag from '@/components/Tag/index.vue'
import Button from '@/components/Button/index.vue'

const apiClashUrl = 'https://api.github.com/repos/Dreamacro/clash/releases/latest'
const apiClashMetaUrl = 'https://api.github.com/repos/MetaCubeX/Clash.Meta/releases/latest'
const apiClashPremiumUrl = 'https://release.dreamacro.workers.dev/'
const clashPremiumDownloadUrl =
  'https://release.dreamacro.workers.dev/latest/clash-windows-amd64-v3-latest.zip'

// [clash, premium, meta]
const loading = ref(true)
const downloadLoadings = ref([false, false, false])
const getLocalVersionLoadings = ref([true, true, true])
const getRemoteVersionLoadings = ref([true, true, true])
const localVersions = ref(['', '', ''])
const remoteVersions = ref(['', '', ''])
const versionDetails = ref(['', '', ''])

const needUpdates = computed(() => [
  localVersions.value[0] !== remoteVersions.value[0],
  localVersions.value[1] !== remoteVersions.value[1],
  localVersions.value[2] !== remoteVersions.value[2]
])

const { t } = useI18n()

const downloadCore_Clash = async () => {
  if (!needUpdates.value[0]) return
  downloadLoadings.value[0] = true
  try {
    const { json } = await HttpGetJSON(apiClashUrl)
    const { assets, tag_name } = json

    const asset = assets.find((v: any) => v.name === `clash-windows-amd64-v3-${tag_name}.zip`)
    if (!asset) throw 'Asset Not Found'

    const path = `data/Clash/${tag_name}.zip`

    await Download(asset.browser_download_url, path)

    await UnzipZIPFile(path, 'data/Clash')

    Notification('Success', 'Download Successfully')
  } catch (error: any) {
    Notification('Error', error)
  }
  downloadLoadings.value[0] = false

  updateLocalVersion_Clash()
}

const downloadCore_Premium = async () => {
  if (!needUpdates.value[1]) return
  downloadLoadings.value[1] = true
  try {
    const tag_name = await getRemoteVersion_Premium()

    if (!tag_name) throw 'Asset Not Found'

    const path = `data/ClashPremium/${tag_name}.zip`

    await Download(clashPremiumDownloadUrl, path)

    await UnzipZIPFile(path, 'data/ClashPremium')

    Notification('Success', 'Download Successfully')
  } catch (error: any) {
    Notification('Error', error)
  }
  downloadLoadings.value[1] = false

  updateLocalVersion_Premium()
}

const downloadCore_Meta = async () => {
  if (!needUpdates.value[2]) {
    return
  }
  downloadLoadings.value[2] = true
  try {
    const { json } = await HttpGetJSON(apiClashMetaUrl)
    const { assets, tag_name } = json

    const asset = assets.find((v: any) => v.name === `clash.meta-windows-amd64-${tag_name}.zip`)
    if (!asset) throw 'Asset Not Found'

    const path = `data/Clash.Meta/${tag_name}.zip`

    await Download(asset.browser_download_url, path)

    await UnzipZIPFile(path, 'data/Clash.Meta')

    Notification('Success', 'Download Successfully')
  } catch (error: any) {
    Notification('Error', error)
  }
  downloadLoadings.value[2] = false

  updateLocalVersion_Meta()
}

const getLocalVersion_Clash = async () => {
  getLocalVersionLoadings.value[0] = true
  try {
    const res = await Exec('data/Clash/clash-windows-amd64-v3', '-v')
    versionDetails.value[0] = res.trim()
    return res.trim().match(/v\S+/)?.[0].trim() || ''
  } catch (error) {
    console.log(error)
  } finally {
    getLocalVersionLoadings.value[0] = false
  }
  return ''
}

const getLocalVersion_Premium = async () => {
  getLocalVersionLoadings.value[1] = true
  try {
    const res = await Exec('data/ClashPremium/clash-windows-amd64-v3', '-v')
    versionDetails.value[1] = res.trim()
    return (
      res
        .trim()
        .match(/\d{4}\.\d{2}\.\d{2}/)?.[0]
        .trim() || ''
    )
  } catch (error) {
    console.log(error)
  } finally {
    getLocalVersionLoadings.value[1] = false
  }
  return ''
}

const getLocalVersion_Meta = async () => {
  getLocalVersionLoadings.value[2] = true
  try {
    const res = await Exec('data/Clash.Meta/clash.meta-windows-amd64', '-v')
    versionDetails.value[2] = res.trim()
    return res.trim().match(/v\S+/)?.[0].trim() || ''
  } catch (error) {
    console.log(error)
  } finally {
    getLocalVersionLoadings.value[2] = false
  }
  return ''
}

const getRemoteVersion_Clash = async () => {
  getRemoteVersionLoadings.value[0] = true
  try {
    const { json } = await HttpGetJSON(apiClashUrl)
    const { tag_name } = json
    return tag_name as string
  } catch (error) {
    console.log(error)
  } finally {
    getRemoteVersionLoadings.value[0] = false
  }
  return ''
}

const getRemoteVersion_Premium = async () => {
  getRemoteVersionLoadings.value[1] = true
  try {
    const { body } = await HttpGet(apiClashPremiumUrl)
    const dom = new DOMParser().parseFromString(body, 'text/html')
    const version = dom.querySelector('li:nth-of-type(2)')
    if (!version) return ''
    const tag_name = version.textContent?.trim().replace('/', '') || 'latest'
    return tag_name
  } catch (error) {
    console.log(error)
  } finally {
    getRemoteVersionLoadings.value[1] = false
  }
  return ''
}

const getRemoteVersion_Meta = async () => {
  getRemoteVersionLoadings.value[2] = true
  try {
    const { json } = await HttpGetJSON(apiClashMetaUrl)
    const { tag_name } = json
    return tag_name as string
  } catch (error) {
    console.log(error)
  } finally {
    getRemoteVersionLoadings.value[2] = false
  }
  return ''
}

const updateLocalVersion_Clash = async () => {
  localVersions.value[0] = await getLocalVersion_Clash()
}

const updateLocalVersion_Premium = async () => {
  localVersions.value[1] = await getLocalVersion_Premium()
}

const updateLocalVersion_Meta = async () => {
  localVersions.value[2] = await getLocalVersion_Meta()
}

const updateRemoteVersion_Clash = async () => {
  remoteVersions.value[0] = await getRemoteVersion_Clash()
}

const updateRemoteVersion_Premium = async () => {
  remoteVersions.value[1] = await getRemoteVersion_Premium()
}

const updateRemoteVersion_Meta = async () => {
  remoteVersions.value[2] = await getRemoteVersion_Meta()
}

const initVersion = async () => {
  loading.value = true
  const [lv1, lv2, lv3] = await Promise.all([
    getLocalVersion_Clash(),
    getLocalVersion_Premium(),
    getLocalVersion_Meta()
  ])
  const [rv1, rv2, rv3] = await Promise.all([
    getRemoteVersion_Clash(),
    getRemoteVersion_Premium(),
    getRemoteVersion_Meta()
  ])
  localVersions.value = [lv1, lv2, lv3]
  remoteVersions.value = [rv1, rv2, rv3]
  loading.value = false
}

initVersion()
</script>

<template>
  <div class="kernel">
    <div class="item">
      <h3>{{ t('kernel.clash.name') }}</h3>
      <Tag @click="updateLocalVersion_Clash" style="cursor: pointer">
        {{ t('kernel.local') }}
        :
        {{
          getLocalVersionLoadings[0] || loading
            ? 'Loading'
            : localVersions[0] || t('kernel.notFound')
        }}
      </Tag>
      <Tag @click="updateRemoteVersion_Clash" style="cursor: pointer">
        {{ t('kernel.remote') }}
        :
        {{
          getRemoteVersionLoadings[0] || loading
            ? 'Loading'
            : remoteVersions[0] || t('kernel.requestFailed')
        }}
      </Tag>
      <Button
        v-show="remoteVersions[0] && needUpdates[0]"
        @click="downloadCore_Clash"
        :loading="downloadLoadings[0]"
        type="primary"
      >
        {{ t('kernel.update') }} : {{ remoteVersions[0] }}
      </Button>
      <div class="detail">
        {{ versionDetails[0] }}
      </div>
    </div>
    <div class="item">
      <h3>{{ t('kernel.clashPremium.name') }}</h3>
      <Tag @click="updateLocalVersion_Premium" style="cursor: pointer">
        {{ t('kernel.local') }}
        :
        {{
          getLocalVersionLoadings[1] || loading
            ? 'Loading'
            : localVersions[1] || t('kernel.notFound')
        }}
      </Tag>
      <Tag @click="updateRemoteVersion_Premium" style="cursor: pointer">
        {{ t('kernel.remote') }}
        :
        {{
          getRemoteVersionLoadings[1] || loading
            ? 'Loading'
            : remoteVersions[1] || t('kernel.requestFailed')
        }}
      </Tag>
      <Button
        v-show="remoteVersions[1] && needUpdates[1]"
        @click="downloadCore_Premium"
        :loading="downloadLoadings[1]"
        type="primary"
      >
        {{ t('kernel.update') }} : {{ remoteVersions[1] }}
      </Button>
      <div class="detail">
        {{ versionDetails[1] }}
      </div>
    </div>
    <div class="item">
      <h3>{{ t('kernel.clashMeta.name') }}</h3>
      <Tag @click="updateLocalVersion_Meta" style="cursor: pointer">
        {{ t('kernel.local') }}
        :
        {{
          getLocalVersionLoadings[2] || loading
            ? 'Loading'
            : localVersions[2] || t('kernel.notFound')
        }}
      </Tag>
      <Tag @click="updateRemoteVersion_Meta" style="cursor: pointer">
        {{ t('kernel.remote') }}
        :
        {{
          getRemoteVersionLoadings[2] || loading
            ? 'Loading'
            : remoteVersions[2] || t('kernel.requestFailed')
        }}
      </Tag>
      <Button
        v-show="remoteVersions[2] && needUpdates[2]"
        @click="downloadCore_Meta"
        :loading="downloadLoadings[2]"
        type="primary"
      >
        {{ t('kernel.update') }} : {{ remoteVersions[2] }}
      </Button>
      <div class="detail">
        {{ versionDetails[2] }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.item {
  .detail {
    font-size: 12px;
    padding: 8px 4px;
  }
}
</style>
