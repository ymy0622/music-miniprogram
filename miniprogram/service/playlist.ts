import request from './index'
import type { PlayListResponse } from './playlist.d'
// @ts-ignore
export type * from './playlist.d'

// 获取歌单
export function getPlaylist(data?: {
  offset?: number
  limit?: number
  cat?: string
}) {
  const { offset = 0, limit = 6, cat = '全部' } = data ?? {}
  return request.get<PlayListResponse>('/top/playlist', { offset, limit, cat })
}
