import {instance} from "../../API/instance";

export const cardsAPI = {
		fetchCards(packId: string) {
				return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${packId}`)
		},
		addPack(data: AddCardType) {
				return instance.post(`cards/card
`, data)
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


export type CardType =  	{
		answer: string
		question: string
		cardsPack_id: string
		grade: number
		shots: number
		user_id: string
		created: string
		updated: string
		_id: string
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
}}

