import { toast } from 'react-toastify'
import { IUsers } from '../utils/interface'
import { ILoginType, IRegisterType, IUserType } from '../utils/types'
import { storageDataName } from '../utils/constants'
import {
  LINK_MANAGE_PROJECT,
  LINK_USER_AUTH,
  LINK_USER_AUTH_LOG_IN,
  LINK_USER_AUTH_PEOPLE,
  LINK_USER_AUTH_SING_UP,
  LINK_USER_AUTH_USER,
  LINK_USER_MANAGE_PROJECT,
} from '../utils/httpLinks'
import api from './ApiProvider'

export const getUsers = async (
  number: number,
  usersOnPage: number,
): Promise<Omit<IUsers, 'password'>> => {
  const res = await api.doFetch(
    'get',
    `${LINK_USER_AUTH_PEOPLE}?page=${number}&count=${usersOnPage}`,
  )

  return res?.data
}

export const getUser = async (userId: string): Promise<IUserType> => {
  const res = await api.doFetch('get', `${LINK_USER_AUTH_USER}/${userId}`)

  return res?.data
}

export const register = async (
  email: string,
  name: string,
  password: string,
): Promise<IRegisterType> => {
  const res = await api.doFetch('post', LINK_USER_AUTH_SING_UP, {
    email,
    name,
    password,
  })

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

export const login = async (
  email: string,
  password: string,
): Promise<ILoginType | void> => {
  const res = await api.doFetch('post', LINK_USER_AUTH_LOG_IN, {
    email,
    password,
  })

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

export const search = async (
  text: string,
): Promise<Omit<IUserType[], 'password'>> => {
  const res = await api.doFetch('get', `${LINK_USER_MANAGE_PROJECT}/${text}`)

  return res?.data
}

export const onProject = async (
  projectId: string,
): Promise<IUserType[] | null> => {
  const res = await api.doFetch(
    'get',
    `${LINK_USER_AUTH}/${'all-on-project'}/${projectId}`,
  )

  return res?.data
}

export const addUser = async (
  userId: string,
  projectId: string,
  state: string,
) => {
  const res = await api.doFetch(
    'post',
    `${LINK_MANAGE_PROJECT}/${'add-to-project'}`,
    { userId, projectId, state },
  )

  return res?.data
}

export const removeUser = async (userId: string, projectId: string) => {
  await api.doFetch('delete', `${LINK_MANAGE_PROJECT}/${userId}/${projectId}`)
}

export const asigneeUserSearch = async (
  text: string,
  projectId: string,
): Promise<Omit<IUserType[], 'password'>> => {
  const res = await api.doFetch(
    'get',
    `${LINK_USER_AUTH}/${'asignee-user'}/${text}/${projectId}`,
  )

  return res?.data
}
