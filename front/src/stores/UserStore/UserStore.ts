import { action, makeObservable, observable } from 'mobx'
import { IUser, IUsers } from '../../utils/interface'
import { storageDataName } from '../../utils/constants'
import RootStore from '../RootStore/RootStore'

class UserStore {
  usersPagination: IUsers | null = null

  user: IUser | null = null

  usersOnProject: IUser[] | null = null

  userId = ''

  userToken = ''

  userSearch: Omit<IUser[], 'password'> | null = null

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      usersPagination: observable,
      usersOnProject: observable,
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
      clearUserNotification: action,
      setUserOnProject: action,
      setAddedUserToProject: action,
      setDeletedUserOnProject: action,
      setClearNotification: action,
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
    const { getUsers } = this.rootStore.apiProvider.userApi
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
      const { getUser } = this.rootStore.apiProvider.userApi
      const user = await getUser(this.userId)

      this.setUser(user)
    }
  }

  setUser = (user: IUser | null) => {
    this.user = user
  }

  registerUser = async (email: string, name: string, password: string) => {
    const { register } = this.rootStore.apiProvider.userApi

    await register(email, name, password)
    await this.asyncGetUser()
  }

  loginUser = async (email: string, password: string) => {
    const { login } = this.rootStore.apiProvider.userApi

    await login(email, password)
    await this.asyncGetUser()
  }

  searchUser = async (text: string) => {
    const { search } = this.rootStore.apiProvider.userApi

    const found = await search(text)
    this.setUserSearch(found)
  }

  setUserSearch = (found: Omit<IUser[], 'password'>) => {
    this.userSearch = found
  }

  getUsersOnProject = async (projectId: string) => {
    const { onProject } = this.rootStore.apiProvider.userApi

    const allUsers = await onProject(projectId)
    if (allUsers) {
      this.setUserOnProject(allUsers)
    }
    // this.usersOnProject = allUsers
  }

  setUserOnProject = (allUsers: Omit<IUser[], 'password'>) => {
    this.usersOnProject = allUsers
  }

  addToProject = async (userId: string, projectId: string, state: string) => {
    const { addUser } = this.rootStore.apiProvider.userApi

    const addedUser = await addUser(userId, projectId, state)

    if (addedUser) {
      this.setAddedUserToProject(addedUser)
    }
  }

  setAddedUserToProject = (addedUser: Omit<IUser, 'password'>) => {
    this.usersOnProject?.push(addedUser)
  }

  deleteUser = async (userId: string, projectId: string) => {
    const { removeUser } = this.rootStore.apiProvider.userApi

    const result = await removeUser(userId, projectId)

    const foundUserIndex =
      result && this.usersOnProject?.findIndex((found) => found.id === userId)

    if (foundUserIndex) {
      this.setDeletedUserOnProject(foundUserIndex)
    }
  }

  setDeletedUserOnProject = (foundUserIndex: number) => {
    this.usersOnProject?.splice(foundUserIndex, 1)
  }

  searchAsigneeUser = async (text: string, projectId: string) => {
    const { asigneeUserSearch } = this.rootStore.apiProvider.userApi

    const asignee = await asigneeUserSearch(text, projectId)
    this.setUserSearch(asignee)
  }

  setAsigneeUserSearch = (asignee: Omit<IUser[], 'password'>) => {
    this.userSearch = asignee
  }

  clearUserNotification = async (userId: string) => {
    const { clearNotification } = this.rootStore.apiProvider.userApi

    const result = await clearNotification(userId)

    if (result) {
      this.setClearNotification()
    }
  }

  setClearNotification = () => {
    this.user?.notification.splice(0, this.user?.notification.length)
  }
}

export default UserStore
