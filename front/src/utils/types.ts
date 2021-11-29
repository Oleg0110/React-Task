export type IUserProjectsType = {
  projectId: string
  state: string
  id: string
}
export type IUserNotificationType = {
  projectId: string
  text: string
  _id: string
  notification: string
}

export type IButtonStyleTypes =
  | 'mainButtonStyle'
  | 'sidebarButtonStyle'
  | 'thirdButtonStyle'
  | 'fourthButtonStyle'
  | 'fifthButtonStyle'
  | 'userFieldButtonStyle'
