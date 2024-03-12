export interface Al {
  id: number
  name: string
  pic: number
  pic_str: string
}

export interface Ar {
  id?: number
  name?: string
}

export interface H {
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}

export interface Hr {
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
  playReason: null
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

export interface Song {
  a?: null
  al?: Al
  alia?: string[]
  ar?: Ar[]
  cd?: string
  cf?: string
  cp?: number
  crbt?: null
  djId?: number
  dt?: number
  fee?: number
  ftype?: number
  h?: H
  hr?: Hr
  id?: number
  l?: L
  m?: M
  mst?: number
  mv?: number
  name?: string
  no?: number
  noCopyrightRcmd?: null
  pop?: number
  privilege?: Privilege
  pst?: number
  rt?: string
  rtUrl?: null
  rtUrls?: string[]
  rtype?: number
  rurl?: null
  songJumpInfo?: null
  sq?: Sq
  st?: number
  t?: number
  v?: number
}

export interface ArtistSongResponse {
  code: number
  message?: string
  more: boolean
  songs: Song[]
  total: number
}

export interface ArtistData {
  alias: string;
  area: number;
  artist: Artist;
  artistId: number;
  artistName: string;
  avatarPicUrl: string;
  blacklist: boolean;
  desc: string;
  headPicUrl: string;
  identify: Identify;
  preferShow: number;
  production: string;
  secondaryExpertIdentiy: SecondaryExpertIdentiy[];
  showPriMsg: boolean;
  transName: null;
  type: number;
  videoCount: number;
}

export interface Artist {
  albumSize: number;
  alias: string[];
  avatar: string;
  briefDesc: string;
  cover: string;
  id: number;
  identifyTag: null;
  identities: string[];
  musicSize: number;
  mvSize: number;
  name: string;
  rank: Rank;
  transNames: string[];
}

export interface Rank {
  rank: number;
  type: number;
}

export interface Identify {
  actionUrl: string;
  imageDesc: string;
  imageUrl: null;
}

export interface SecondaryExpertIdentiy {
  expertIdentiyCount: number;
  expertIdentiyId: number;
  expertIdentiyName: string;
}

export interface ArtistResponse {
  code: number;
  data: ArtistData;
  message: string;
}

export interface ArtistFollowCountResponse {
  code: number;
  data: {
    fansCnt: number;
    follow: boolean;
    followCnt: number;
    followDay: string;
    isFollow: boolean;
  };
  message: string;
}
