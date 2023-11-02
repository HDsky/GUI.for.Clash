export const deepCloneJson = <T>(json: any) => {
  return JSON.parse(JSON.stringify(json)) as T
}

export const debounce = (fn: () => any, wait: number) => {
  let timer = 0
  return function () {
    return new Promise((resolve) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn()
        resolve(null)
      }, wait)
    })
  }
}
