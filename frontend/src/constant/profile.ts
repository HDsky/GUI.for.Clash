export const DnsConfigDefaults = {
  enable: true,
  ipv6: false,
  nameserver: ['https://223.5.5.5/dns-query', 'https://1.12.12.12/dns-query'],
  'enhanced-mode': 'fake-ip',
  'fake-ip-range': '198.18.0.1/16',
  'fake-ip-filter': [
    '*.lan',
    '*.localdomain',
    '*.example',
    '*.invalid',
    '*.localhost',
    '*.test',
    '*.local',
    '*.home.arpa'
  ],
  'prefer-h3': true
}

export const GeneralConfigDefaults = {
  port: 0,
  mode: 'rule',
  ipv6: false,
  secret: '',
  'socks-port': 0,
  'mixed-port': 0,
  'allow-lan': false,
  'log-level': 'info',
  'external-controller': '127.0.0.1:9090',
  'external-ui': 'ui',
  'interface-name': ''
}

export const MetaGeneralConfigDefaults = {
  'keep-alive-interval': 30,
  'find-process-mode': 'strict',
  'external-controller-tls': '',
  'external-ui-name': '',
  'external-ui-url': '',
  'unified-delay': true,
  'tcp-concurrent': true,
  tls: {
    certificate: '',
    'private-key': ''
  },
  'global-client-fingerprint': 'chrome',
  'geodata-mode': true,
  'geodata-loader': 'standard',
  'geox-url': {
    geoip: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat',
    geosite: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat',
    mmdb: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb'
  },
  'global-ua': 'clash.meta'
}

export const PremiumGeneralConfigDefaults = {
  profile: {
    tracing: false
  },
  experimental: {
    'sniff-tls-sni': false
  },
  ebpf: {
    'redirect-to-tun': []
  }
}

export const TunConfigDefaults = {
  enable: true,
  stack: 'system',
  'auto-route': false,
  'auto-detect-interface': false,
  'dns-hijack': [],
  device: 'ClashTun',
  mtu: 9000,
  'strict-route': false,
  'endpoint-independent-nat': false
}
