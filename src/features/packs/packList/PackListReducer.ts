import {AddCardsPack, PacksAPI, PackType, UpdatePackType} from "../PacksAPI";
import {AppThunk} from "../../../app/store";


export type InitialStateType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    isDisabled: boolean
    cardsCount: Array<number>
    userId: string
    sortBy: string
    searchedText: string
}
export const initialState: InitialStateType = {
    cardPacks: [],
    page: 1, //выбранная стр
    pageCount: 4, //ко-во стр
    cardPacksTotalCount: 2, // количество колод
    minCardsCount: 0,
    maxCardsCount: 4,
    isDisabled: false,
    cardsCount: [1, 30],
    userId: '',
    sortBy: '0',
    searchedText: '',
}

export const packListReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/ADD-PACKS':
            return { ...state, cardPacks: [...state.cardPacks, action.newCardsPack] }
        case 'PACKS/UPDATE-PACKS':
            return {
                ...state,
                cardPacks: [...state.cardPacks].map(e =>
                    e._id === action.data._id
                        ? {
                            ...e,
                            name: action.data.name,
                        }
                        : e
                ),
            }
        default:
            return state
    }
}

export const addPackTC =
    (data: AddCardsPack): AppThunk =>
        dispatch => {
            PacksAPI.addPack(data).then(res => {
                dispatch(addPackAC(res.data.newCardsPack))
            })
        }

export const updatePackTC =
    (data: UpdatePackType): AppThunk =>
        dispatch => {
            PacksAPI.createPack(data).then(res => {
                dispatch(updatePackAC(res.data.updatedCardsPack))
            })
        }

export const addPackAC = (newCardsPack: PackType) => ({type: 'PACKS/ADD-PACKS', newCardsPack} as const)
export const updatePackAC = (data: PackType) => ({ type: 'PACKS/UPDATE-PACKS', data } as const)

export type PacksActionType =
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof updatePackAC>