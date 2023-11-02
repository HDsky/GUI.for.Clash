import * as App from '@wails/go/main/App'
export * from '@wails/runtime/runtime'

export const Writefile = async (path: string, content: string) => {
  const { flag, data } = await App.Writefile(path, content)
  if (!flag) {
    throw data
  }
  return data
}

export const Readfile = async (path: string) => {
  const { flag, data } = await App.Readfile(path)
  if (!flag) {
    throw data
  }
  return data
}

export const UnzipZIPFile = async (path: string, output: string) => {
  const { flag, data } = await App.UnzipZIPFile(path, output)
  if (!flag) {
    throw data
  }
  return data
}

export const UnzipGZFile = async (path: string, output: string) => {
  const { flag, data } = await App.UnzipGZFile(path, output)
  if (!flag) {
    throw data
  }
  return data
}

export const Download = async (url: string, path: string) => {
  const { flag, data } = await App.Download(url, path)
  if (!flag) {
    throw data
  }
  return data
}

export const HttpGet = async (url: string, headers = {}) => {
  const { flag, header, body } = await App.HttpGet(url, headers)
  if (!flag) {
    throw body
  }
  return { header, body }
}

export const HttpGetJSON = async (url: string, headers = {}) => {
  const { flag, header, body } = await App.HttpGet(url, headers)
  if (!flag) {
    throw body
  }
  return { header, json: JSON.parse(body) }
}

export const Notification = async (title: string, message: string, icon = '') => {
  const { flag, data } = await App.Notification(title, message, icon)
  if (!flag) {
    throw data
  }
  return data
}

export const Getcwd = async () => {
  const { flag, data } = await App.Getcwd()
  if (!flag) {
    throw data
  }
  return data
}

export const Exec = async (path: string, args: string) => {
  const { flag, data } = await App.Exec(path, args)
  if (!flag) {
    throw data
  }
  return data
}
