export interface IModalWindowProps {
  isModalOpened: boolean,
  onModalClose?: () => void,
  id: string
}

export interface ICurrentUsersProps {
  _id: string
  email: string
  name: string
  password: string
  __v: number
}

export interface IUsers {
  currentUser: ICurrentUsersProps[],
  pageNumbers: number[],
  allUsers: number
}