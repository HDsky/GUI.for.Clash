<script setup lang="ts">
import { ref } from 'vue'
import { Writefile, Readfile, HttpGet, Download, UnzipZIPFile } from '@wails/go/main/App'

const result = ref('')

const click = async () => {
  const res = await Writefile('/data/test.txt', 'okhhhh')
  console.log(res.flag, res.data)
  result.value = JSON.stringify(res, null, 2)
}

const click2 = async () => {
  const res = await Readfile('/data/test.txt')
  console.log(res.flag, res.data)
  result.value = JSON.stringify(res, null, 2)
}

const click3 = async () => {
  const res = await HttpGet('http://baidu.com', {
    test: 'test'
  })
  console.log(res.flag, res.body, res.header)
  result.value = JSON.stringify(res, null, 2)
}

const click5 = async () => {
  // const res = await Download(
  //   'https://www.wintun.net/builds/wintun-0.14.1.zip',
  //   './data/wintun-0.14.1.zip'
  // )
  const res = await Download(
    'https://github.com/Dreamacro/clash/releases/download/premium/clash-windows-amd64-v3-2023.08.17.zip',
    './data/premium/clash.zip'
  )
  console.log(res)
  result.value = JSON.stringify(res, null, 2)
}

const click6 = async () => {
  // const res = await UnzipFile('./data/wintun-0.14.1.zip', './data')
  const res = await UnzipZIPFile('./data/premium/clash.zip', './data/premium')
  console.log(res)
  result.value = JSON.stringify(res, null, 2)
}
</script>

<template>
  <div class="debug">
    <div @click="click" class="btn">写入文件</div>
    <div @click="click2" class="btn">读取文件</div>
    <div @click="click3" class="btn">请求百度</div>
    <div @click="click5" class="btn">下载测试</div>
    <div @click="click6" class="btn">解压文件</div>
  </div>
  <div class="result">
    <pre>{{ result }}</pre>
  </div>
</template>

<style lang="less" scoped>
.debug {
  display: flex;
  flex-wrap: wrap;
  .btn {
    margin: 4px;
  }
}

.result {
  padding: 8px;
  color: var(--color);
  border: 1px solid var(--bg-color);
  pre {
    white-space: pre-wrap;
  }
}
</style>
