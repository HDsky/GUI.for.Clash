export enum Kernel {
  Clash = 'Clash',
  ClashPremium = 'ClashPremium',
  ClashMeta = 'Clash.Meta'
}

export const KernelOptions = [
  { label: 'kernel.clash.name', value: Kernel.Clash },
  { label: 'kernel.clashPremium.name', value: Kernel.ClashPremium },
  { label: 'kernel.clashMeta.name', value: Kernel.ClashMeta }
]

export const ModeOptions = [
  {
    label: 'kernel.rule',
    value: 'rule'
  },
  {
    label: 'kernel.global',
    value: 'global'
  },
  {
    label: 'kernel.direct',
    value: 'direct'
  }
]

export const LogLevelOptions = [
  {
    label: 'kernel.info',
    value: 'info'
  },
  {
    label: 'kernel.warning',
    value: 'warning'
  },
  {
    label: 'kernel.error',
    value: 'error'
  },
  {
    label: 'kernel.debug',
    value: 'debug'
  },
  {
    label: 'kernel.silent',
    value: 'silent'
  }
]

export const FindProcessModeOptions = [
  {
    label: 'kernel.clashMeta.always',
    value: 'always'
  },
  {
    label: 'kernel.clashMeta.strict',
    value: 'strict'
  },
  {
    label: 'kernel.clashMeta.off',
    value: 'off'
  }
]

export const GlobalClientFingerprintOptions = [
  { label: 'kernel.clashMeta.chrome', value: 'chrome' },
  { label: 'kernel.clashMeta.firefox', value: 'firefox' },
  { label: 'kernel.clashMeta.safari', value: 'safari' },
  { label: 'kernel.clashMeta.iOS', value: 'iOS' },
  { label: 'kernel.clashMeta.android', value: 'android' },
  { label: 'kernel.clashMeta.edge', value: 'edge' },
  { label: 'kernel.clashMeta.360', value: '360' },
  { label: 'kernel.clashMeta.qq', value: 'qq' },
  { label: 'kernel.clashMeta.random', value: 'random' }
]

export const GeodataLoaderOptions = [
  { label: 'kernel.clashMeta.standard', value: 'standard' },
  { label: 'kernel.clashMeta.memconservative', value: 'memconservative' }
]

export const GroupsTypeOptions = [
  {
    label: 'kernel.proxyGroups.type.select',
    value: 'select'
  },
  {
    label: 'kernel.proxyGroups.type.url-test',
    value: 'url-test'
  },
  {
    label: 'kernel.proxyGroups.type.fallback',
    value: 'fallback'
  },
  {
    label: 'kernel.proxyGroups.type.relay',
    value: 'relay'
  },
  {
    label: 'kernel.proxyGroups.type.load-balance',
    value: 'load-balance'
  }
]

export const StrategyOptions = [
  {
    label: 'kernel.proxyGroups.strategy.consistent-hashing',
    value: 'consistent-hashing'
  },
  {
    label: 'kernel.proxyGroups.strategy.round-robin',
    value: 'round-robin'
  }
]

export const RulesTypeOptions = [
  {
    label: 'kernel.rules.type.DOMAIN',
    value: 'DOMAIN',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.DOMAIN-SUFFIX',
    value: 'DOMAIN-SUFFIX',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.DOMAIN-KEYWORD',
    value: 'DOMAIN-KEYWORD',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.GEOIP',
    value: 'GEOIP',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.IP-CIDR',
    value: 'IP-CIDR',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.IP-CIDR6',
    value: 'IP-CIDR6',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.SRC-IP-CIDR',
    value: 'SRC-IP-CIDR',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.SRC-PORT',
    value: 'SRC-PORT',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.DST-PORT',
    value: 'DST-PORT',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.PROCESS-NAME',
    value: 'PROCESS-NAME',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.PROCESS-PATH',
    value: 'PROCESS-PATH',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.rules.type.RULE-SET',
    value: 'RULE-SET',
    support: [Kernel.ClashPremium, Kernel.ClashMeta]
  },
  {
    label: 'kernel.rules.type.SCRIPT',
    value: 'SCRIPT',
    support: [Kernel.ClashPremium, Kernel.ClashMeta]
  },
  {
    label: 'kernel.rules.type.GEOIP',
    value: 'GEOIP',
    support: [Kernel.ClashPremium, Kernel.ClashMeta]
  },
  {
    label: 'kernel.rules.type.GEOSITE',
    value: 'GEOSITE',
    support: [Kernel.ClashMeta]
  },
  {
    label: 'kernel.rules.type.MATCH',
    value: 'MATCH',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  }
]

export const StackOptions = [
  { label: 'kernel.tun.system', value: 'system' },
  { label: 'kernel.tun.gvisor', value: 'gvisor' },
  { label: 'kernel.tun.lightweight', value: 'lightweight' }
]

export const EnhancedModeOptions = [
  {
    label: 'kernel.dns.fake-ip',
    value: 'fake-ip',
    support: [Kernel.ClashPremium, Kernel.ClashMeta, Kernel.Clash]
  },
  {
    label: 'kernel.dns.redir-host',
    value: 'redir-host',
    support: [Kernel.ClashMeta]
  }
]
