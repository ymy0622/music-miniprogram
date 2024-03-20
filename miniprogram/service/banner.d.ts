export interface BannerResponse {
  banners: Banner[];
  code: number;
}

export interface Banner {
  adDispatchJson: null;
  adid: null;
  adLocation: null;
  adSource: null;
  adurlV2: null;
  alg: string;
  bannerBizType: string;
  bannerId: string;
  dynamicVideoData: null;
  encodeId: string;
  event: null;
  exclusive: boolean;
  extMonitor: null;
  extMonitorInfo: null;
  logContext: null;
  mainTitle: null;
  monitorBlackList: null;
  monitorClick: null;
  monitorClickList: string[];
  monitorImpress: null;
  monitorImpressList: string[];
  monitorType: null;
  pic: string;
  pid: null;
  program: null;
  requestId: string;
  s_ctrp: string;
  scm: string;
  showAdTag: boolean;
  showContext: null;
  song: Song;
  targetId: number;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null | string;
  video: null;
}

export interface Song {
  a: null;
  al: Al;
  alg: string;
  alia: string[];
  ar: Ar[];
  cd: string;
  cf: string;
  copyright: number;
  cp: number;
  crbt: null;
  djId: number;
  dt: number;
  entertainmentTags: null;
  fee: number;
  ftype: number;
  h: H;
  hr: null | Hr;
  id: number;
  l: L;
  m: M;
  mark: number;
  mst: number;
  mv: number;
  name: string;
  no: number;
  noCopyrightRcmd: null;
  originCoverType: number;
  originSongSimpleData: null;
  pop: number;
  privilege: Privilege;
  pst: number;
  publishTime: number;
  resourceState: boolean;
  rt: string;
  rtUrl: null;
  rtUrls: string[];
  rtype: number;
  rurl: null;
  s_id: number;
  single: number;
  songJumpInfo: null;
  sq: null | Sq;
  st: number;
  t: number;
  tagPicList: null;
  v: number;
  version: number;
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
  alias: string[];
  id: number;
  name: string;
  tns: string[];
}

export interface H {
  br: number;
  fid: number;
  size: number;
  sr: number;
  vd: number;
}

export interface Hr {
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

export interface Privilege {
  chargeInfoList: ChargeInfoList[];
  cp: number;
  cs: boolean;
  dl: number;
  dlLevel: string;
  downloadMaxbr: number;
  downloadMaxBrLevel: string;
  fee: number;
  fl: number;
  flag: number;
  flLevel: string;
  freeTrialPrivilege: FreeTrialPrivilege;
  id: number;
  maxbr: number;
  maxBrLevel: string;
  payed: number;
  pl: number;
  playMaxbr: number;
  playMaxBrLevel: string;
  plLevel: string;
  preSell: boolean;
  rightSource: number;
  rscl: null;
  sp: number;
  st: number;
  subp: number;
  toast: boolean;
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

export interface Sq {
  br: number;
  fid: number;
  size: number;
  sr: number;
  vd: number;
}
