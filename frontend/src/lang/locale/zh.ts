export default {
  common: {
    grid: '网格',
    list: '列表',
    add: '添加',
    more: '更多',
    edit: '编辑',
    clear: '清理',
    update: '更新',
    delete: '删除',
    cancel: '取消',
    submit: '保存',
    nextStep: '下一步',
    prevStep: '上一步',
    disabled: '已禁用',
    enabled: '已启用',
    notSupported: '不支持',
    preview: '预览',
    warning: '警告',
    disable: '禁用',
    enable: '启用',
    use: '使用'
  },
  kernel: {
    port: 'HTTP(s)代理端口',
    mode: '工作模式',
    ipv6: '开启IPv6',
    secret: 'RESTful API密钥',
    'socks-port': 'SOCKS5代理端口',
    'mixed-port': '混合代理端口',
    'allow-lan': '允许局域网访问',
    'log-level': '日志级别',
    'external-controller': 'RESTful Web API监听地址',
    'external-ui': 'Web UI路径',
    'interface-name': '出站接口名称',
    info: '信息',
    warning: '警告',
    error: '错误',
    debug: '调试',
    silent: '静默',
    rule: '规则',
    global: '全局',
    direct: '直连',
    'keep-alive-interval': 'TCP Keep Alive 间隔',
    'find-process-mode': '进程匹配模式',
    'external-controller-tls': 'RESTful Web API监听地址(HTTPS)',
    'external-ui-name': '外部用户界面',
    'external-ui-url': '自定义外部用户界面下载地址',
    'unified-delay': '统一延迟',
    'tcp-concurrent': 'TCP并发',
    tun: {
      enable: '启用TUN',
      stack: 'TUN模式堆栈',
      device: 'TUN网卡名称',
      'auto-route': '自动设置全局路由',
      'auto-detect-interface': '自动选择流量出口接口',
      'dns-hijack': 'dns 劫持',
      'strict-route': '严格路由',
      mtu: '最大传输单元',
      'endpoint-independent-nat': '独立于端点的 NAT',
      system: 'System',
      gvisor: 'Gvisor',
      lightweight: 'Lightweight'
    },
    dns: {
      enable: '启用DNS',
      ipv6: 'IPv6',
      'prefer-h3': 'Prefer h3',
      'enhanced-mode': '增强模式',
      'fake-ip-range': 'Fake-IP 范围',
      'fake-ip-filter': 'Fake-IP 过滤',
      nameserver: '域名服务器',
      'fake-ip': 'Fake-IP',
      'redir-host': 'Redir-Host'
    },
    tls: {
      certificate: '证书(PEM格式/路径)',
      'private-key': '私钥(PEM格式/路径)'
    },
    'global-client-fingerprint': '全局客户端指纹',
    'geodata-mode': 'GEO数据模式',
    'geodata-loader': 'GEO文件加载模式',
    'geox-url': {
      geoip: 'geoip下载地址',
      geosite: 'geosite下载地址',
      mmdb: 'mmdb下载地址'
    },
    'global-ua': '自定客户端UA',
    tracing: '性能分析引擎',
    'sniff-tls-sni': '嗅探TLS SNI',
    'redirect-to-tun': 'eBPF 重定向到 TUN',
    proxyGroups: {
      name: '名称',
      lazy: 'Lazy',
      'disable-udp': '禁用UDP',
      interval: '间隔',
      tolerance: '容差',
      url: '测速链接',
      filter: '过滤',
      notFound: '以下订阅或节点已丢失，请清理',
      type: {
        name: '类型',
        select: '手动选择',
        'url-test': '自动测速',
        fallback: '自动回退',
        relay: '链式代理',
        'load-balance': '负载均衡'
      },
      strategy: {
        name: '负载均衡策略',
        'consistent-hashing': 'consistent-hashing',
        'round-robin': 'round-robin'
      }
    },
    rules: {
      payload: '载荷',
      proxy: '代理',
      'no-resolve': '跳过DNS解析',
      notSupported: '当前内核不支持，请切换内核',
      type: {
        name: '类型',
        DOMAIN: '域名',
        GEOIP: '国家IP代码规则',
        GEOSITE: '域名集合',
        IPSET: 'IP集',
        SCRIPT: '脚本',
        MATCH: '全匹配',
        'DOMAIN-SUFFIX': '域名后缀',
        'DOMAIN-KEYWORD': '域名关键词',
        'IP-CIDR': 'IPv4地址段',
        'IP-CIDR6': 'IPv6地址段',
        'SRC-PORT': '源端口',
        'DST-PORT': '目标端口',
        'PROCESS-NAME': '源进程名',
        'PROCESS-PATH': '源进程路径',
        'RULE-SET': '规则集',
        'SRC-IP-CIDR': '源IP段地址'
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
      standard: '标准',
      memconservative: '适用小内存设备',
      chrome: 'Chrome',
      firefox: 'Firefox',
      safari: 'Safari',
      iOS: 'IOS',
      android: 'Android',
      edge: 'Edge',
      '360': '360',
      qq: 'QQ',
      random: '随机',
      always: '开启',
      strict: '自动',
      off: '关闭'
    },
    notFound: '无内核',
    requestFailed: '获取失败',
    local: '本地',
    remote: '远程',
    update: '更新'
  },
  router: {
    overview: '概览',
    subscribes: '订阅',
    settings: '设置',
    debug: '调试',
    components: '组件预览',
    about: '关于',
    profiles: '配置',
    kernel: '内核'
  },
  home: {
    mode: '代理模式',
    global: '全局',
    rule: '规则',
    direct: '直连',
    quickStart: '快速开始',
    noProfile: '你当前没有一个有效的配置文件，请进入向导设置！'
  },
  subscribe: {
    http: '远程',
    file: '本地',
    name: '名称',
    url: '链接',
    website: '官网',
    path: '保存路径',
    include: '包含',
    exclude: '排除',
    updating: '更新中'
  },
  subscribes: {
    updateAll: '更新全部',
    download: '下行流量',
    upload: '上行流量',
    total: '总流量',
    expire: '过期时间',
    updateTime: '更新时间',
    subtype: '订阅类型',
    website: '官网',
    empty: '订阅列表为空，请先{action}订阅。'
  },
  profile: {
    name: '名称',
    generalSettings: '通用设置',
    advancedSettings: '高级设置',
    notSupported: '该内核不支持高级设置',
    step: {
      kernel: '选择内核',
      general: '通用设置',
      'tun&dns': 'TUN & DNS 设置',
      groups: '代理组设置',
      rules: '规则设置'
    },
    proxies: '使用节点',
    use: '使用订阅',
    noSubs: '没有可用的订阅',
    alreadyExists: '已存在'
  },
  profiles: {
    kernelType: '内核类型',
    empty: '配置列表为空，请先{action}配置。'
  },
  settings: {
    general: '通用',
    theme: {
      name: '主题设置',
      light: '浅色',
      dark: '深色',
      auto: '跟随系统'
    },
    lang: {
      name: '语言设置',
      zh: '简体中文',
      en: 'English'
    }
  },
  format: {
    seconds: '秒',
    minutes: '分钟',
    hours: '小时',
    days: '天',
    months: '月',
    years: '年',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    day: '天',
    month: '月',
    year: '年',
    ago: '前',
    later: '后'
  }
}
