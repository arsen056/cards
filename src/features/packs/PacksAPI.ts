import {instance} from "../../API/instance";

export const PacksAPI = {
  fetchPacks(params: any) {
    return instance.get<PacksResponseType>('cards/pack', {
      params: params
    })
  },

  searchPacks(name:string) {
    return instance.get<PacksResponseType>(`cards/pack?packName=${name}`)
  }
}

export type PacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
}

export type PackType =  {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
}

