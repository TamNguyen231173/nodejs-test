import {User} from "~/types/user.type";

export interface Game {
  _id?: any
  name: string
  description: string
  author: User
  price: number
  image: string
  flag: boolean
}

export interface CreateGameInput {
  name: string,
  description: string,
  author: string,
  price: number,
  image?: string,
}

export interface UpdateGameInput {
  name?: string,
  description?: string,
  price?: number,
  image?: string,
}

export interface GetGamesQuery {
  page: number
  pageSize: number
  filter: {
    search?: string,
    author?: string
  }
}
