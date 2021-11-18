import {
  IButtonStyleTypes,
  IUserNotificationType,
  IUserProjectsType,
} from './types'

export interface IModalWindowProps {
  isModalOpened: boolean
  onModalClose?: () => void
  id: string
}

export interface IUser {
  id: string
  email: string
  name: string
  projects: IUserProjectsType[]
  notification: IUserNotificationType[]
}

export interface IUsers {
  currentUser: IUser[]
  pageNumbers: number[]
  allUsers: number
}

export interface IRegister {
  token: string
  currentUser: IUser
}

export interface ILogin {
  userId: string
  token: string
}

export interface ITask {
  id: string
  index: number
  text: string
  columnOwner: string
  projectOwner: string
  asigneeUser: string
  asigneeUserId: string
}

export interface IColumn {
  id: string
  title: string
  projectOwner: string
  tasks: ITask[]
}

export interface IProject {
  content: string
  title: string
  userOwner: string
  id: string
  userEmail: string
}

export interface IButtonProps {
  id: string
  name: string
  link: string
  icon: string
  style: IButtonStyleTypes
}
