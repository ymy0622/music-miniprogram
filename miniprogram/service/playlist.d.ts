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
  tracks?: null | Track[]
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

export interface PlayListDetailResponse {
  code: number
  playlist: Playlist
}

export interface Track {
  a: null
  al: Al
  alia: string[]
  ar: Ar[]
  awardTags: null
  cd: string
  cf: string
  copyright: number
  cp: number
  crbt: null
  djId: number
  dt: number
  entertainmentTags: null
  fee: number
  ftype: number
  h: H
  hr: Hr
  id: number
  l: L
  m: M
  mark: number
  mst: number
  mv: number
  name: string
  no: number
  noCopyrightRcmd: null
  originCoverType: number
  originSongSimpleData: null | OriginSongSimpleData
  pop: number
  pst: number
  publishTime: number
  resourceState: boolean
  rt: null | string
  rtUrl: null
  rtUrls: string[]
  rtype: number
  rurl: null
  s_id: number
  single: number
  songJumpInfo: null
  sq: Sq
  st: number
  t: number
  tagPicList: null
  tns: string[]
  v: number
  version: number
  videoInfo: VideoInfo
}

export interface Al {
  id: number
  name: string
  pic: number
  pic_str: string
  picUrl: string
  tns: string[]
}

export interface Ar {
  alias: string[]
  id: number
  name: string
  tns: string[]
}

export interface H {
  br: number
  fid: number
  size: number
  vd: number
}

export interface Hr {
  br: number
  fid: number
  size: number
  vd: number
}

export interface L {
  br: number
  fid: number
  size: number
  vd: number
}

export interface M {
  br: number
  fid: number
  size: number
  vd: number
}

export interface OriginSongSimpleData {
  albumMeta: AlbumMeta
  artists: Artist[]
  name: string
  songId: number
}

export interface AlbumMeta {
  id: number
  name: string
}

export interface Artist {
  id: number
  name: string
}

export interface Sq {
  br: number
  fid: number
  size: number
  vd: number
}

export interface VideoInfo {
  moreThanOne: boolean
  video: null | Video
}

export interface Video {
  alias: null
  artists: null
  coverUrl: string
  playTime: number
  publishTime: number
  title: string
  type: number
  vid: string
}

export interface PlaylistTracksResponse {
  code: number
  privileges: Privilege[]
  songs: Song[]
}

export interface Privilege {
  chargeInfoList?: ChargeInfoList[]
  cp?: number
  cs?: boolean
  dl?: number
  dlLevel?: string
  downloadMaxbr?: number
  downloadMaxBrLevel?: string
  fee?: number
  fl?: number
  flag?: number
  flLevel?: string
  freeTrialPrivilege?: FreeTrialPrivilege
  id?: number
  maxbr?: number
  maxBrLevel?: string
  payed?: number
  pl?: number
  playMaxbr?: number
  playMaxBrLevel?: string
  plLevel?: string
  preSell?: boolean
  rightSource?: number
  rscl?: null
  sp?: number
  st?: number
  subp?: number
  toast?: boolean
}

export interface ChargeInfoList {
  chargeMessage: null
  chargeType: number
  chargeUrl: null
  rate: number
}

export interface FreeTrialPrivilege {
  cannotListenReason: null
  listenType: null
  playReason: null
  resConsumable: boolean
  userConsumable: boolean
}

export interface Song {
  a?: null
  al?: Al
  alia?: string[]
  ar?: Ar[]
  awardTags?: null
  cd?: string
  cf?: string
  copyright?: number
  cp?: number
  crbt?: null
  djId?: number
  dt?: number
  entertainmentTags?: null
  fee?: number
  ftype?: number
  h?: H
  hr?: null
  id?: number
  l?: L
  m?: M
  mark?: number
  mst?: number
  mv?: number
  name?: string
  no?: number
  noCopyrightRcmd?: null
  originCoverType?: number
  originSongSimpleData?: null
  pop?: number
  pst?: number
  publishTime?: number
  resourceState?: boolean
  rt?: string
  rtUrl?: null
  rtUrls?: string[]
  rtype?: number
  rurl?: null
  s_id?: number
  single?: number
  songJumpInfo?: null
  sq?: Sq
  st?: number
  t?: number
  tagPicList?: null
  v?: number
  version?: number
}

export interface Al {
  id: number
  name: string
  pic: number
  picUrl: string
  tns: string[]
}

export interface H {
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}

export interface L {
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}

export interface M {
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}

export interface Sq {
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}
