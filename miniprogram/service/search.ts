import request from './index'
import type {
  SearchSuggestResponse,
  SearchResponse,
  SearchMultimatchResponse,
} from './search.d'
// @ts-ignore
export type * from './search.d'

export function searchSuggest(data: {
  keywords: string
  type?: 'mobile' | ''
}) {
  const { keywords, type = 'mobile' } = data
  return request.get<SearchSuggestResponse>('/search/suggest', {
    keywords,
    type,
  })
}

export function search(data: {
  keywords: string
  type: number
  offset?: number
  limit?: number
}) {
  const { keywords, type, offset = 0, limit = 20 } = data
  return request.get<SearchResponse>('/cloudsearch', {
    keywords,
    type,
    offset,
    limit,
  })
}

export function searchMultimatch(keywords: string) {
  return request.get<SearchMultimatchResponse>('/search/multimatch', {
    keywords,
  })
}
