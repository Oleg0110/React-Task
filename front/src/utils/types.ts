export type IUserType = {
  _id: string
  email: string
  name: string
  password: string
  __v: number
}

export type IProjectType = {
  content: string
  title: string
  userOwner: string
  __v: number
  _id: string
}

export type ITaskType = {
  _id: string
  text: string
  listOwner: string
  projectOwner: string
  __v: number
}

export type IColumnType = {
  _id: string
  title: string
  projectOwner: string
  __v: number
  tasks: ITaskType[]
}
