import request from './index'
import type { RankingResponse } from './ranking.d'
// @ts-ignore
export type * from './ranking.d'

// 获取榜单
export function getRankingList() {
  return request.get<RankingResponse>('/toplist')
}
