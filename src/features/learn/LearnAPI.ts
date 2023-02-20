import {instance} from "../../common/instance/instance";
import {CardType} from "../cards/CardsAPI";

export const learnAPI = {
    setGrade(payload: SetGradePayloadType) {
        return instance.put<SetGradeResponseType>('cards/grade', payload)
    },
}

export type SetGradePayloadType = {
    grade: number
    card_id: string
}

export type SetGradeResponseType = {
    updatedGrade: UpgradedGradeType
}

type UpgradedGradeType = Pick<CardType, 'cardsPack_id' | 'user_id' | 'grade' | 'shots'> & {
    _id: string
    card_id: string
}