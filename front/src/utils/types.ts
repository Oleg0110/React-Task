export type IUserProjectsType = {
  projectId: string
  state: string
  id: string
}
export type IUserNotificationType = {
  projectId: string
  text: string
  id: string
}

export type IAllType = {
  noti: string
  projectId: string
  projectName?: string
  text: string
  id: string
}

export type IButtonStyleTypes =
  | 'mainButtonStyle'
  | 'sidebarButtonStyle'
  | 'thirdButtonStyle'
  | 'fourthButtonStyle'
  | 'fifthButtonStyle'
  | 'userFieldButtonStyle'
