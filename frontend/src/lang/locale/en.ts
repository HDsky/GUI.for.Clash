export default {
  common: {
    grid: 'Grid',
    list: 'List',
    add: 'Add',
    more: 'More',
    edit: 'Edit',
    clear: 'Clear',
    update: 'Update',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    nextStep: 'Next',
    prevStep: 'Prev',
    disabled: 'Disabled',
    enabled: 'Enabled',
    notSupported: 'Not Supported',
    preview: 'Preview',
    warning: 'Warning',
    disable: 'Disable',
    enable: 'Enable',
    use: 'Use'
  },
  kernel: {
    port: 'HTTP(s) Port',
    mode: 'Mode',
    ipv6: 'IPv6',
    secret: 'RESTful API Secret',
    'socks-port': 'SOCKS5 Port',
    'mixed-port': 'Mixed Port',
    'allow-lan': 'Allow Lan',
    'log-level': 'Log Level',
    'external-controller': 'External Controller',
    'external-ui': 'External UI',
    'interface-name': 'Interface Name',
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    debug: 'Debug',
    silent: 'Silent',
    rule: 'Rule',
    global: 'Global',
    direct: 'Direct',
    'keep-alive-interval': 'keep-alive-interval',
    'find-process-mode': 'find-process-mode',
    'external-controller-tls': 'external-controller-tls',
    'external-ui-name': 'external-ui-name',
    'external-ui-url': 'external-ui-url',
    'unified-delay': 'unified-delay',
    'tcp-concurrent': 'tcp-concurrent',
    tun: {
      enable: 'Enable',
      stack: 'Stack',
      device: 'Device',
      'auto-route': 'Auto Route',
      'auto-detect-interface': 'Auto Detect Interface',
      'dns-hijack': 'DNS Hijack',
      'strict-route': 'Strict Route',
      mtu: 'MTU',
      'endpoint-independent-nat': 'Endpoint Independent NAT',
      system: 'System',
      gvisor: 'Gvisor',
      lightweight: 'Lightweight'
    },
    dns: {
      enable: 'Enable',
      ipv6: 'IPv6',
      'prefer-h3': 'Prefer h3',
      'enhanced-mode': 'Enhanced Mode',
      'fake-ip-range': 'Fake-IP Range',
      'fake-ip-filter': 'Fake-IP Filter',
      nameserver: 'NameServer',
      'fake-ip': 'Fake-IP',
      'redir-host': 'Redir-Host'
    },
    tls: {
      certificate: 'certificate',
      'private-key': 'private-key'
    },
    'global-client-fingerprint': 'global-client-fingerprint',
    'geodata-mode': 'geodata-mode',
    'geodata-loader': 'geodata-loader',
    'geox-url': {
      geoip: 'geoip',
      geosite: 'geosite',
      mmdb: 'mmdb'
    },
    'global-ua': 'global-ua',
    tracing: 'Tracing',
    'sniff-tls-sni': 'Sniff TLS SNI',
    'redirect-to-tun': 'eBPF Redirect to TUN',
    proxyGroups: {
      name: 'Name',
      lazy: 'Lazy',
      'disable-udp': 'Disable UDP',
      interval: 'Interval',
      tolerance: 'Tolerance',
      url: 'URL',
      filter: 'Filter',
      notFound: 'The following subscriptions or proxies have been lost, please clean them up',
      type: {
        name: 'Type',
        select: 'select',
        'url-test': 'url-test',
        fallback: 'fallback',
        relay: 'relay',
        'load-balance': 'load-balance'
      },
      strategy: {
        name: 'Strategy',
        'consistent-hashing': 'consistent-hashing',
        'round-robin': 'round-robin'
      }
    },
    rules: {
      payload: 'Payload',
      proxy: 'Proxy',
      'no-resolve': 'No Resolve',
      notSupported: 'The current kernel does not support it, please use another one.',
      type: {
        name: 'Type',
        DOMAIN: 'DOMAIN',
        GEOIP: 'GEOIP',
        GEOSITE: 'GEOSITE',
        IPSET: 'IPSET',
        SCRIPT: 'SCRIPT',
        MATCH: 'MATCH',
        'DOMAIN-SUFFIX': 'DOMAIN-SUFFIX',
        'DOMAIN-KEYWORD': 'DOMAIN-KEYWORD',
        'IP-CIDR': 'IP-CIDR',
        'IP-CIDR6': 'IP-CIDR6',
        'SRC-PORT': 'SRC-PORT',
        'DST-PORT': 'DST-PORT',
        'PROCESS-NAME': 'PROCESS-NAME',
        'PROCESS-PATH': 'PROCESS-PATH',
        'RULE-SET': 'RULE-SET',
        'SRC-IP-CIDR': 'SRC-IP-CIDR'
      }
    },
    clash: {
      name: 'Clash'
    },
    clashPremium: {
      name: 'Clash Premium'
    },
    clashMeta: {
      name: 'Clash.Meta',
      standard: 'Standard',
      memconservative: 'Memconservative',
      chrome: 'Chrome',
      firefox: 'Firefox',
      safari: 'Safari',
      iOS: 'IOS',
      android: 'Android',
      edge: 'Edge',
      '360': '360',
      qq: 'QQ',
      random: 'Random',
      always: 'Always',
      strict: 'Strict',
      off: 'Off'
    },
    notFound: 'Kernel Not Found',
    requestFailed: 'Request Failed',
    local: 'Local',
    remote: 'Remote',
    update: 'Update'
  },
  router: {
    overview: 'OverView',
    subscribes: 'Subscribes',
    settings: 'Settings',
    debug: 'Debug',
    components: 'Components',
    about: 'About',
    profiles: 'Profiles',
    kernel: 'Kernel'
  },
  home: {
    mode: 'Proxy Mode',
    global: 'Global',
    rule: 'Rule',
    direct: 'Direct',
    quickStart: 'Quick Start',
    noProfile: 'You currently do not have a valid profile, please set it!'
  },
  subscribe: {
    http: 'HTTP',
    file: 'FILE',
    name: 'Name',
    url: 'Url',
    website: 'Website',
    path: 'Save Path',
    include: 'Include',
    exclude: 'Exclude',
    updating: 'Updating'
  },
  subscribes: {
    updateAll: 'Update All',
    download: 'Download',
    upload: 'Upload',
    total: 'Total',
    expire: 'Expire',
    updateTime: 'Update Time',
    subtype: 'Subscribe Type',
    website: 'Website',
    empty: 'The subscription list is empty. Please {action} a subscription first.'
  },
  profile: {
    name: 'Name',
    generalSettings: 'General Settings',
    advancedSettings: 'Advanced Settings',
    notSupported: 'This kernel does not support advanced settings.',
    step: {
      kernel: 'Select Kernel',
      general: 'General Settings',
      'tun&dns': 'TUN & DNS Settings',
      groups: 'Proxy Groups Settings',
      rules: 'Rules Settings'
    },
    proxies: 'Proxies',
    use: 'Use',
    noSubs: 'There are no available subscriptions.',
    alreadyExists: 'Already Exists'
  },
  profiles: {
    kernelType: 'Kernel',
    empty: 'The profiles list is empty, Please {action} a profile first.'
  },
  settings: {
    general: 'General',
    theme: {
      name: 'Theme',
      light: 'Light Mode',
      dark: 'Dark Mode',
      auto: 'System'
    },
    lang: {
      name: 'Language',
      zh: '简体中文',
      en: 'English'
    }
  },
  format: {
    seconds: 'Seconds',
    minutes: 'Minutes',
    hours: 'Hours',
    days: 'Days',
    months: 'Months',
    years: 'Years',
    second: 'Second',
    minute: 'Minute',
    hour: 'Hour',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    ago: 'Ago',
    later: 'Later'
  }
}
