export interface MvArtist {
  id: number
  name: string
}

export interface Mv {
  aliaName: string
  appTitle: string
  appword: string
  area: string
  artists: MvArtist[]
  authId: number
  caption: number
  captionLanguage: string
  dayplays: number
  desc: string
  fee: number
  id: number
  monthplays: number
  mottos: string
  neteaseonly: number
  oneword: null
  online: number
  pic16v9: number
  pic4v3: number
  plays: number
  publishTime: string
  score: number
  stars: null
  status: number
  style: null
  subTitle: string
  subType: string
  title: string
  topWeeks: string
  transName: string
  type: string
  upban: number
  videos: Video[]
  weekplays: number
}

export interface Video {
  check: boolean
  container: string
  duration: number
  height: number
  md5: string
  size: number
  tag: string
  tagSign: TagSign
  url: string
  width: number
}

export interface TagSign {
  br: number
  mvtype: string
  resolution: number
  tagSign: string
  type: string
}

export interface MVItem {
  alias: string[]
  artistId: number
  artistName: string
  artists: MvArtist[]
  briefDesc: null | string
  cover: string
  desc: null | string
  duration: number
  id: number
  lastRank: number
  mark: number
  mv: Mv
  name: string
  playCount: number
  score: number
  subed: boolean
}

export interface PersonalizedMVResponse {
  code: number
  data: MVItem[]
}

export interface TopMVResponse {
  code: number
  data: MVItem[]
  hasMore: boolean
  updateTime: number
}
