export interface SongDetailResponse {
  code: number;
  privileges: Privilege[];
  songs: Song[];
}

export interface Privilege {
  chargeInfoList?: ChargeInfoList[];
  cp?: number;
  cs?: boolean;
  dl?: number;
  dlLevel?: string;
  downloadMaxbr?: number;
  downloadMaxBrLevel?: string;
  fee?: number;
  fl?: number;
  flag?: number;
  flLevel?: string;
  freeTrialPrivilege?: FreeTrialPrivilege;
  id?: number;
  maxbr?: number;
  maxBrLevel?: string;
  payed?: number;
  pl?: number;
  playMaxbr?: number;
  playMaxBrLevel?: string;
  plLevel?: string;
  preSell?: boolean;
  rightSource?: number;
  rscl?: null;
  sp?: number;
  st?: number;
  subp?: number;
  toast?: boolean;
}

export interface ChargeInfoList {
  chargeMessage: null;
  chargeType: number;
  chargeUrl: null;
  rate: number;
}

export interface FreeTrialPrivilege {
  cannotListenReason: null;
  listenType: null;
  playReason: null;
  resConsumable: boolean;
  userConsumable: boolean;
}

export interface Song {
  a?: null;
  al?: Al;
  alia?: string[];
  ar?: Ar[];
  awardTags?: null;
  cd?: string;
  cf?: string;
  copyright?: number;
  cp?: number;
  crbt?: null;
  djId?: number;
  dt?: number;
  entertainmentTags?: null;
  fee?: number;
  ftype?: number;
  h?: H;
  hr?: null;
  id?: number;
  l?: L;
  m?: M;
  mark?: number;
  mst?: number;
  mv?: number;
  name?: string;
  no?: number;
  noCopyrightRcmd?: null;
  originCoverType?: number;
  originSongSimpleData?: null;
  pop?: number;
  pst?: number;
  publishTime?: number;
  resourceState?: boolean;
  rt?: string;
  rtUrl?: null;
  rtUrls?: string[];
  rtype?: number;
  rurl?: null;
  s_id?: number;
  single?: number;
  songJumpInfo?: null;
  sq?: Sq;
  st?: number;
  t?: number;
  tagPicList?: null;
  v?: number;
  version?: number;
}

export interface Al {
  id: number;
  name: string;
  pic: number;
  pic_str: string;
  picUrl: string;
  tns: string[];
}

export interface Ar {
  alias?: string[];
  id?: number;
  name?: string;
  tns?: string[];
}

export interface H {
  br: number;
  fid: number;
  size: number;
  sr: number;
  vd: number;
}

export interface L {
  br: number;
  fid: number;
  size: number;
  sr: number;
  vd: number;
}

export interface M {
  br: number;
  fid: number;
  size: number;
  sr: number;
  vd: number;
}

export interface Sq {
  br: number;
  fid: number;
  size: number;
  sr: number;
  vd: number;
}

export interface SongLyricResponse {
  code: number;
  klyric: Klyric;
  lrc: Lrc;
  lyricUser: LyricUser;
  qfy: boolean;
  romalrc: Romalrc;
  sfy: boolean;
  sgc: boolean;
  tlyric: Tlyric;
}

export interface Klyric {
  lyric: string;
  version: number;
}

export interface Lrc {
  lyric: string;
  version: number;
}

export interface LyricUser {
  demand: number;
  id: number;
  nickname: string;
  status: number;
  uptime: number;
  userid: number;
}

export interface Romalrc {
  lyric: string;
  version: number;
}

export interface Tlyric {
  lyric: string;
  version: number;
}
