export type IUserProjectsType = [
  {
    idProject?: string
    state?: string
    id?: string
  },
]

export type IUserType = {
  id: string
  email: string
  name: string
  projects: any
  // [
  //   {
  //     idProject?: string
  //     state?: string
  //     id?: string
  //   },
  // ]
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
  userEmail: string
}

export type ITaskType = {
  id: string
  text: string
  columnOwner: string
  projectOwner: string
  asigneeUser: string
}

export type IColumnType = {
  id: string
  title: string
  projectOwner: string
  tasks: ITaskType[]
}

export type IUserState = {
  projectId: string
  state: string
  id: string
}
