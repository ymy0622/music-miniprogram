import type { MVItem } from './video'
export type { MVItem } from './video'

export interface Artist {
  followed?: boolean
  id?: number
  img1v1Url?: string
  name?: string
}

export interface Br {
  br: number
  point: number
  size: number
}

export interface MVDetail {
  artistId: number
  artistName: string
  artists: Artist[]
  briefDesc: string
  brs: Br[]
  commentCount: number
  commentThreadId: string
  cover: string
  coverId: number
  coverId_str: string
  desc: string
  duration: number
  id: number
  name: string
  nType: number
  playCount: number
  price: null
  publishTime: string
  shareCount: number
  subCount: number
  videoGroup: string[]
}

export interface MVDetailResponse {
  code: number
  data: MVDetail
}

export interface MVUrl {
  code: number
  expi: number
  fee: number
  id: number
  md5: string
  msg: string
  mvFee: number
  promotionVo: null
  r: number
  size: number
  st: number
  url: string
}

export interface MVUrlResponse {
  code: number
  data: MVUrl
}

export interface RelatedVideoResponse {
  code: number
  data: MVItem[]
  message: string
}
