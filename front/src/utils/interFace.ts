import { IUserType } from './types'

export interface IModalWindowProps {
  isModalOpened: boolean
  onModalClose?: () => void
  id: string
}

export interface IUsers {
  currentUser: IUserType[]
  pageNumbers: number[]
  allUsers: number
}
