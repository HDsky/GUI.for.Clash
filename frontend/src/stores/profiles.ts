import { ref } from 'vue'
import { defineStore } from 'pinia'
import { parse, stringify } from 'yaml'
import { Readfile, Writefile } from '@/utils/bridge'
import { Kernel } from '@/constant/kernel'
import { debounce } from '@/utils'

export type ProfileType = {
  id: string
  name: string
  kernel: Kernel.Clash | Kernel.ClashMeta | Kernel.ClashPremium
  generalConfig?: {
    port?: number
    mode?: string
    ipv6?: boolean
    secret?: string
    'socks-port'?: number
    'mixed-port'?: number
    'allow-lan'?: boolean
    'log-level'?: string
    'external-controller'?: string
    'external-ui'?: string
    'interface-name'?: string
  }
  metaGeneralConfig?: {
    'keep-alive-interval'?: number
    'find-process-mode'?: string
    'external-controller-tls'?: string
    'external-ui-name'?: string
    'external-ui-url'?: string
    'unified-delay'?: boolean
    'tcp-concurrent'?: boolean
    tls?: {
      certificate?: string
      'private-key'?: string
    }
    'global-client-fingerprint'?: string
    'geodata-mode'?: boolean
    'geodata-loader'?: string
    'geox-url'?: {
      geoip?: string
      geosite?: string
      mmdb?: string
    }
    'global-ua'?: string
  }
  premiumGeneralConfig?: {
    profile?: {
      tracing: boolean
    }
    experimental?: {
      'sniff-tls-sni': boolean
    }
    ebpf?: {
      'redirect-to-tun': string[]
    }
  }
  tunConfig?: {
    enable?: boolean
    stack?: string
    'auto-route'?: boolean
    'auto-detect-interface'?: boolean
    'dns-hijack'?: string[]
    device?: string
    mtu?: number
    'strict-route'?: boolean
    'endpoint-independent-nat'?: boolean
  }
  dnsConfig?: {
    enable?: boolean
    ipv6?: boolean
    nameserver?: string[]
    'enhanced-mode'?: string
    'fake-ip-range'?: string
    'fake-ip-filter'?: string[]
    'prefer-h3'?: boolean
  }
  proxyGroupsConfig: {
    name: string
    type: string
    proxies: {
      type: string
      name: string
    }[]
    url: string
    interval: number
    strategy: string
    use: string[]
    tolerance: number
    lazy: boolean
    'disable-udp': boolean
    filter: string
  }[]
  rulesConfig: {
    type: string
    payload: string
    proxy: string
    'no-resolve': boolean
    filter: string
  }[]
}

const profilesFilePath = './data/profiles.yaml'

export const useProfilesStore = defineStore('profiles', () => {
  const profiles = ref<ProfileType[]>([])

  const setupProfiles = async () => {
    const data = await Readfile(profilesFilePath)
    profiles.value = parse(data)
  }

  const saveProfiles = debounce(async () => {
    const data = await Writefile(profilesFilePath, stringify(profiles.value))
    return data
  }, 100)

  const addProfile = async (p: ProfileType) => {
    profiles.value.push(p)
    try {
      await saveProfiles()
    } catch (error) {
      profiles.value.pop()
      throw error
    }
  }

  const deleteProfile = async (id: string) => {
    const idx = profiles.value.findIndex((v) => v.id === id)
    if (idx === -1) {
      return
    }
    const backup = profiles.value.splice(idx, 1)[0]
    try {
      await saveProfiles()
    } catch (error) {
      profiles.value.splice(idx, 0, backup)
      throw error
    }
  }

  const editProfile = async (id: string, p: ProfileType) => {
    const idx = profiles.value.findIndex((v) => v.id === id)
    if (idx === -1) {
      return
    }
    const backup = profiles.value.splice(idx, 1, p)[0]
    try {
      await saveProfiles()
    } catch (error) {
      profiles.value.splice(idx, 1, backup)
      throw error
    }
  }

  return {
    profiles,
    setupProfiles,
    saveProfiles,
    addProfile,
    editProfile,
    deleteProfile
  }
})
