import request from './index'
import type { SongDetailResponse, SongLyricResponse } from './song.d'
// @ts-ignore
export type * from './song.d'

// 获取歌曲详情
export function getSongDetail(idx: number | number[]) {
  const ids = typeof idx === 'number' ? String(idx) : idx.join(',')
  return request.get<SongDetailResponse>('/song/detail', { ids })
}

export function getSongLyric(id: number) {
  return request.get<SongLyricResponse>('/lyric', { id })
}
