import { instance } from 'common/instance/instance'

export const PacksAPI = {
  fetchPacks(params: any) {
    return instance.get<PacksResponseType>('cards/pack', {
      params: params,
    })
  },
  addPack(data: AddCardsPack) {
    return instance.post<ResponseTypeNewCardsPack>(`cards/pack`, data)
  },
  deletePack(id: string) {
    return instance.delete<ResponseDeletedCardsPackType>(`cards/pack?id=${id}`)
  },
  editPack(data: UpdatePackType) {
    return instance.put<ResponseUpdateType>(`cards/pack`, data)
  },
}

export type AddCardsPack = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type ResponseUpdateType = {
  updatedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type UpdatePackType = {
  cardsPack: {
    _id: string
    name?: string
    private?: boolean
    deckCover?: string
  }
}

export type ResponseTypeNewCardsPack = {
  newCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type ResponseDeletedCardsPackType = {
  deletedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type GetPacksPayloadType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type PacksResponseType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
