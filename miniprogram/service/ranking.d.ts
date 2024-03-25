import type { Track } from './playlist'

export interface RankingList {
  adType: number
  anonimous: boolean
  artists: null
  backgroundCoverId: number
  backgroundCoverUrl: null
  cloudTrackCount: number
  commentThreadId: string
  coverImageUrl: null
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  coverText: null
  createTime: number
  creator: null
  description: string
  englishTitle: null
  highQuality: boolean
  iconImageUrl: null
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  recommendInfo: null
  socialPlaylistCover: null
  specialType: number
  status: number
  subscribed: null
  subscribedCount: number
  subscribers: string[]
  tags: string[]
  titleImage: number
  titleImageUrl: null
  ToplistType: string
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  tracks: null | Track[]
  trackUpdateTime: number
  tsSongCount: number
  updateFrequency: string
  updateTime: number
  userId: number
}

export interface RankingResponse {
  code: number
  list: RankingList[]
}
