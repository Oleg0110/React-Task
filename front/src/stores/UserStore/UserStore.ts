import { action, makeObservable, observable } from 'mobx'
import { IUserType } from 'utils/types'
import { IUsers } from '../../utils/interface'
import { getUser, getUsers, login, register } from '../../services/user'
import { storageDataName } from '../../utils/constants'

class UserStore {
  users: IUsers | null = null

  user: IUserType | null = null

  userId = ''

  userToken = ''

  constructor() {
    makeObservable(this, {
      users: observable,
      user: observable,
      userId: observable,
      userToken: observable,
      registerUser: action,
      loginUser: action,
      setUsers: action,
      setUser: action,
      asyncGetUsers: action,
      asyncGetUser: action,
      getUserId: action,
      setUserId: action,
      getUserToken: action,
      setUserToken: action,
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

  // !!! ToDO any
  asyncGetUsers = async (number: number, usersOnPage: number) => {
    const users: IUsers | null = await getUsers(number, usersOnPage)

    this.setUsers(users)
  }

  setUsers = (user: IUsers) => {
    this.users = user
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
}

export default new UserStore()
