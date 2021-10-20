export type IUserType = {
  id: string
  email: string
  name: string
  password: string
}

export type IRegisterType = {
  token: string
  currentUser: IUserType
}

export type ILoginType = {
  userId: string
  token: string
}

export type IProjectType = {
  content: string
  title: string
  userOwner: string
  id: string
}

export type ITaskType = {
  id: string
  text: string
  columnOwner: string
  projectOwner: string
}

export type IColumnType = {
  id: string
  title: string
  projectOwner: string
  tasks?: ITaskType[]
}
