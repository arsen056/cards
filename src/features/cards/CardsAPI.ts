import { instance } from 'common/instance/instance'

export const cardsAPI = {
  fetchCards(params: any, packId: string) {
    return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${packId}`, { params: params })
  },
  addPack(data: AddCardType) {
    return instance.post(`cards/card`, data)
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`)
  },
  updateCard(data: UpdateCardType) {
    return instance.put('cards/card', data)
  },
  setGrades(data: { grade: string; card_id: string }) {
    return instance.put<ResponseGradeUpdateCardType>(`/cards/grade`, data)
  },
}

export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  packName: string
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  _id: string
  answer: string
  question: string
  cardsPack_id: string
  questionImg?: string
  answerImg?: string
  grade: number
  shots?: number
  user_id: string
  created: string
  updated: string

  comments?: string
  type?: string
  rating?: number
  more_id?: string
}

export type AddCardType = {
  card: {
    cardsPack_id: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
  }
}

export type UpdateCardType = {
  card: {
    _id: string
    question: string // не обязательно
    answer: string
  }
}

export type LearnCardType = {
  grade: number
  card_id: string
}

export interface UpdatedGrade {
  card_id: string
  user_id: string
  cardsPack_id: string
  grade: number
  shots: number
  more_id: string
  _id: string
  created: string
  updated: string
  __v: number
}

export interface ResponseGradeUpdateCardType {
  updatedGrade: UpdatedGrade
  token: string
  tokenDeathTime: number
}

export type ResponseUpdatedGradeType = {
  updatedGrade: {
    card_id: string
    grade: number
    shots: number
  }
}