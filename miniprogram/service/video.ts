import request from './index'
import type { PersonalizedMVResponse, TopMVResponse } from './video.d'
// @ts-ignore
export type * from './video.d'

export function getPersonalizedMV(offset = 0, limit = 6) {
  return request.get<PersonalizedMVResponse>('/mv/first', { offset, limit })
}

export function getTopMV(offset: number, limit = 10) {
  return request.get<TopMVResponse>('/top/mv', { offset, limit })
}
