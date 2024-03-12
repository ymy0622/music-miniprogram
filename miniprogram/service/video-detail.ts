import request from './index'
import type { MVDetailResponse, MVUrlResponse, RelatedVideoResponse } from './video-detail.d'
// @ts-ignore
export type * from './video-detail.d'

// 获取MV详情
export function getMovieDetail(id: number) {
  return request.get<MVDetailResponse>('/mv/detail', { mvid: id })
}
// 获取MV播放地址
export function getMovieUrl(id: number, r = 1080) {
  return request.get<MVUrlResponse>('/mv/url', { id, r })
}
// 获取相关视频
export function getRelatedVideos(id: number) {
  return request.get<RelatedVideoResponse>('/related/allvideo', { id })
}
