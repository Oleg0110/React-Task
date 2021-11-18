import { toast } from 'react-toastify'
import {
  LINK_MANAGE_PROJECT,
  LINK_USER_AUTH,
  LINK_USER_AUTH_LOG_IN,
  LINK_USER_AUTH_PEOPLE,
  LINK_USER_AUTH_SING_UP,
  LINK_USER_AUTH_USER,
  LINK_USER_MANAGE_PROJECT,
} from '../utils/httpLinks'
import RootStore from '../stores/RootStore/RootStore'
import { ILogin, IRegister, IUser, IUsers } from '../utils/interface'
import { storageDataName } from '../utils/constants'

class UserApi {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  getUsers = async (
    number: number,
    usersOnPage: number,
  ): Promise<Omit<IUsers, 'password'>> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_USER_AUTH_PEOPLE}?page=${number}&count=${usersOnPage}`,
    )

    return res?.data
  }

  getUser = async (userId: string): Promise<IUser> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_USER_AUTH_USER}/${userId}`,
    )

    return res?.data
  }

  register = async (
    email: string,
    name: string,
    password: string,
  ): Promise<IRegister> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      LINK_USER_AUTH_SING_UP,
      {
        email,
        name,
        password,
      },
    )

    if (res) {
      const { token, currentUser } = res.data

      localStorage.setItem(
        storageDataName,
        JSON.stringify({
          userId: currentUser.id,
          // token: token,
          token,
        }),
      )

      toast.success('Acount was Created')

      return currentUser
    }
    throw toast.success('Acount was not Created')
  }

  login = async (email: string, password: string): Promise<ILogin | void> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      LINK_USER_AUTH_LOG_IN,
      {
        email,
        password,
      },
    )

    if (res) {
      const user = res.data

      localStorage.setItem(
        storageDataName,
        JSON.stringify({
          userId: user.userId,
          token: user.token,
        }),
      )

      toast.success('Welcome')
    }
  }

  search = async (text: string): Promise<Omit<IUser[], 'password'>> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_USER_MANAGE_PROJECT}/${text}`,
    )

    return res?.data
  }

  onProject = async (projectId: string): Promise<IUser[] | null> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_USER_AUTH}/${'all-on-project'}/${projectId}`,
    )

    return res?.data
  }

  addUser = async (userId: string, projectId: string, state: string) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      `${LINK_MANAGE_PROJECT}/${'add-to-project'}`,
      { userId, projectId, state },
    )

    return res?.data
  }

  removeUser = async (userId: string, projectId: string) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'delete',
      `${LINK_MANAGE_PROJECT}/${userId}/${projectId}`,
    )

    return res?.data
  }

  asigneeUserSearch = async (
    text: string,
    projectId: string,
  ): Promise<Omit<IUser[], 'password'>> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_USER_AUTH}/${'asignee-user'}/${text}/${projectId}`,
    )

    return res?.data
  }

  clearNotification = async (userId: string) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'delete',
      `${LINK_USER_AUTH}/${'clear-notification'}/${userId}`,
    )

    return res?.data
  }
}

export default UserApi
