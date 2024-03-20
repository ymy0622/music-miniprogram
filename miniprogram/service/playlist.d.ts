export interface Playlist {
  adType?: number
  alg?: string
  anonimous?: boolean
  cloudTrackCount?: number
  commentCount?: number
  commentThreadId?: string
  coverImgId?: number
  coverImgId_str?: string
  coverImgUrl?: string
  coverStatus?: number
  coverText?: null
  createTime?: number
  creator?: Creator
  description?: string
  highQuality?: boolean
  iconImgUrl?: null
  id?: number
  name?: string
  newImported?: boolean
  ordered?: boolean
  playCount?: number
  privacy?: number
  recommendInfo?: null
  recommendText?: null
  relateResId?: null
  relateResType?: null
  shareCount?: number
  socialPlaylistCover?: null
  specialType?: number
  status?: number
  subscribed?: boolean
  subscribedCount?: number
  subscribers?: Subscriber[]
  tags?: string[]
  totalDuration?: number
  trackCount?: number
  trackNumberUpdateTime?: number
  tracks?: null
  trackUpdateTime?: number
  updateTime?: number
  userId?: number
}

export interface Creator {
  accountStatus: number
  anchor: boolean
  authenticationTypes: number
  authority: number
  authStatus: number
  avatarDetail: AvatarDetail
  avatarImgId: number
  avatarImgIdStr: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: boolean
  description: string
  detailDescription: string
  djStatus: number
  experts: Experts
  expertTags: string[]
  followed: boolean
  gender: number
  mutual: boolean
  nickname: string
  province: number
  remarkName: null
  signature: string
  userId: number
  userType: number
  vipType: number
}

export interface AvatarDetail {
  identityIconUrl: string
  identityLevel: number
  userType: number
}

export interface Experts {
  '1': string
  '2': string
}

export interface Subscriber {
  accountStatus?: number
  anchor?: boolean
  authenticationTypes?: number
  authority?: number
  authStatus?: number
  avatarDetail?: null
  avatarImgId?: number
  avatarImgIdStr?: string
  avatarUrl?: string
  backgroundImgId?: number
  backgroundImgIdStr?: string
  backgroundUrl?: string
  birthday?: number
  city?: number
  defaultAvatar?: boolean
  description?: string
  detailDescription?: string
  djStatus?: number
  experts?: null
  expertTags?: null
  followed?: boolean
  gender?: number
  mutual?: boolean
  nickname?: string
  province?: number
  remarkName?: null
  signature?: string
  userId?: number
  userType?: number
  vipType?: number
}

export interface PlayListResponse {
  cat: string
  code: number
  more: boolean
  playlists: Playlist[]
  total: number
}
