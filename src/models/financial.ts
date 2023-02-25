import { ObjectId } from 'mongodb'

export interface Item {
  id: string
  name: string
  price: number
}

export type NewItem = Omit<Item, 'id'>

export interface MonthData {
  id: string
  month: number
  budget: number
  expneses: {
    recurring: Item[]
    nonRecurring: Item[]
  }
}

export interface YearData {
  _id: ObjectId
  userId: ObjectId
  year: number
  months: MonthData[]
}

export type NewYearData = Omit<YearData, '_id'>
