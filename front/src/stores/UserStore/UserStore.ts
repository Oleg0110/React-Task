import { action, makeObservable, observable } from 'mobx'
import { IUserState, IUserType } from '../../utils/types'
import { IUsers } from '../../utils/interface'
import {
  addUser,
  onProject,
  getUser,
  getUsers,
  login,
  register,
  search,
  removeUser,
  asigneeUserSearch,
} from '../../services/user'
import { storageDataName } from '../../utils/constants'

class UserStore {
  usersPagination: IUsers | null = null

  user: IUserType | null = null

  usersOnProject: IUserType[] | null = null

  userId = ''

  userToken = ''

  userSearch: Omit<IUserType[], 'password'> | null = null

  constructor() {
    makeObservable(this, {
      usersPagination: observable,
      user: observable,
      userId: observable,
      userToken: observable,
      userSearch: observable,
      registerUser: action,
      loginUser: action,
      setUsers: action,
      setUser: action,
      asyncGetUsers: action,
      asyncGetUser: action,
      getUserId: action,
      setUserId: action,
      getUserToken: action,
      getUsersOnProject: action,
      setUserToken: action,
      searchUser: action,
      setUserSearch: action,
      addToProject: action,
      deleteUser: action,
      searchAsigneeUser: action,
      setAsigneeUserSearch: action,
    })
    this.getUserToken()
    this.getUserId()
    this.asyncGetUser()
  }

  getUserId = () => {
    const userId = localStorage.getItem(storageDataName)

    if (userId) {
      const userJson = JSON.parse(userId)

      this.setUserId(userJson.userId)
    }
  }

  setUserId = (id: string) => {
    this.userId = id
  }

  getUserToken = () => {
    const userToken = localStorage.getItem(storageDataName)

    if (userToken) {
      const userJson = JSON.parse(userToken)
      const { token } = userJson

      this.setUserToken(token)
    }
  }

  setUserToken = (token: string) => {
    this.userToken = token
  }

  asyncGetUsers = async (number: number, usersOnPage: number) => {
    const users: IUsers | null = await getUsers(number, usersOnPage)

    this.setUsers(users)
  }

  setUsers = (user: IUsers) => {
    this.usersPagination = user
  }

  asyncGetUser = async () => {
    await this.getUserToken()
    await this.getUserId()

    if (this.userId) {
      const user = await getUser(this.userId)

      this.setUser(user)
    }
  }

  setUser = (user: IUserType | null) => {
    this.user = user
  }

  registerUser = async (email: string, name: string, password: string) => {
    await register(email, name, password)
    await this.asyncGetUser()
  }

  loginUser = async (email: string, password: string) => {
    await login(email, password)
    await this.asyncGetUser()
  }

  searchUser = async (text: string) => {
    const found = await search(text)
    this.setUserSearch(found)
  }

  setUserSearch = (found: Omit<IUserType[], 'password'>) => {
    this.userSearch = found
  }

  getUsersOnProject = async (projectId: string) => {
    const all = await onProject(projectId)

    this.usersOnProject = all
  }

  addToProject = async (userId: string, projectId: string, state: string) => {
    await addUser(userId, projectId, state)
  }

  deleteUser = async (userId: string, projectId: string) => {
    await removeUser(userId, projectId)
  }

  searchAsigneeUser = async (text: string, projectId: string) => {
    const asignee = await asigneeUserSearch(text, projectId)
    this.setUserSearch(asignee)
  }

  setAsigneeUserSearch = (asignee: Omit<IUserType[], 'password'>) => {
    this.userSearch = asignee
  }
}

export default new UserStore()
