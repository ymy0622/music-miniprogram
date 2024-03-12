export interface SuggestMatch {
  alg: string
  feature: string
  keyword: string
  lastKeyword: string
  type: number
}

export interface SearchSuggestResponse {
  code: number
  message?: string
  result: { allMatch: SuggestMatch[] }
}

export interface Result {
  searchQcReminder: null
  songCount: number
  songs: Song[]
}

export interface Song {
  a: null
  al: Al
  alia: string[]
  ar: Ar[]
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
  hr: null
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
  originSongSimpleData: null
  pop: number
  privilege: Privilege
  pst: number
  publishTime: number
  resourceState: boolean
  rt: string
  rtUrl: null
  rtUrls: string[]
  rtype: number
  rurl: null
  s_id: number
  single: number
  songJumpInfo: null
  sq: null | Sq
  st: number
  t: number
  tagPicList: null
  v: number
  version: number
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

export interface Privilege {
  chargeInfoList: ChargeInfoList[]
  cp: number
  cs: boolean
  dl: number
  dlLevel: string
  downloadMaxbr: number
  downloadMaxBrLevel: string
  fee: number
  fl: number
  flag: number
  flLevel: string
  freeTrialPrivilege: FreeTrialPrivilege
  id: number
  maxbr: number
  maxBrLevel: string
  payed: number
  pl: number
  playMaxbr: number
  playMaxBrLevel: string
  plLevel: string
  preSell: boolean
  rightSource: number
  rscl: null
  sp: number
  st: number
  subp: number
  toast: boolean
}

export interface ChargeInfoList {
  chargeMessage: null
  chargeType: number
  chargeUrl: null
  rate: number
}

export interface FreeTrialPrivilege {
  cannotListenReason: number
  listenType: number
  resConsumable: boolean
  userConsumable: boolean
}

export interface Sq {
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}

export interface SearchResponse {
  code: number
  message?: string
  result: {
    searchQcReminder: null
    songCount: number
    songs: Song[]
  }
}

export interface Artist {
  albumSize?: number
  alg?: string
  alias?: string[]
  briefDesc?: string
  fansSize?: number
  id?: number
  img1v1Id?: number
  img1v1Id_str?: string
  img1v1Url?: string
  musicSize?: number
  mvSize?: number
  name?: string
  occupation?: string
  officialTags?: string[]
  picId?: number
  picId_str?: string
  picUrl?: string
  searchCircle?: null
  trans?: string
  transNames?: null
  videoSize?: number
}

export interface SearchMultimatchResponse {
  code: number
  message?: string
  result: {  artist: Artist[] }
}
