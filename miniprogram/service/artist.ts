import request from './index'
import type { ArtistResponse, ArtistFollowCountResponse, ArtistSongResponse } from './artist.d'
// @ts-ignore
export type * from './artist.d'

// 获取歌手详情
export function getArtist(id: number) {
  return request.get<ArtistResponse>('/artist/detail', { id })
}

// 获取歌手粉丝数量
export function getArtistFollowCount(id: number) {
  return request.get<ArtistFollowCountResponse>('/artist/follow/count', { id })
}

// 获取歌手歌曲
export function getArtistSong(
  id: number,
  order: 'hot' | 'time' = 'hot',
  offset?: number,
  limit = 15
) {
  return request.get<ArtistSongResponse>('/artist/songs', { id, order, offset, limit })
}
