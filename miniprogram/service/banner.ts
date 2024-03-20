import request from './index'
import type { BannerResponse } from './banner.d'
// @ts-ignore
export type * from './banner.d'

// 获取Banner
export function getBanner() {
  return request.get<BannerResponse>('/banner', { type: 2 })
}
