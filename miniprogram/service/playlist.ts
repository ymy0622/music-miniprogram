import request from './index'
import type {
  PlayListResponse,
  PlayListDetailResponse,
  PlaylistTracksResponse,
} from './playlist.d'
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

// 歌单详情
export function getPlaylistDetail(id: number) {
  return request.get<PlayListDetailResponse>('/playlist/detail', { id })
}

// 歌单中的歌曲
export function getPlaylistTracks(id: number, offset = 0, limit = 20) {
  return request.get<PlaylistTracksResponse>('/playlist/track/all', { id, offset, limit })
}
