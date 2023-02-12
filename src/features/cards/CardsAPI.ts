import {instance} from "../../API/instance";

export const cardsAPI = {
		fetchCards(packId: string) {
				return instance.get<CardsResponseType>(`/cards/card?cardsPack_id=${packId}`)
		},
}

export type CardsResponseType = {
		cards: CardType[]
		cardsTotalCount: number
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

