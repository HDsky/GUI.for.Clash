import { type ProfileType } from '@/stores/profiles'

export const generateRule = (r: ProfileType['rulesConfig'][0]) => {
  const { type, payload, proxy, 'no-resolve': noResolve } = r
  let rule = type
  if (type !== 'MATCH') {
    rule += ',' + payload
  }
  rule += ',' + proxy
  if (noResolve) {
    rule += ',no-resolve'
  }
  return rule
}
