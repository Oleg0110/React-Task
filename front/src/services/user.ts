import { toast } from 'react-toastify'
import { IUsers } from 'utils/interface'
import { IUserType } from 'utils/types'
import { storageDataName } from '../utils/constants'
import {
  LINK_USER_AUTH_LOG_IN,
  LINK_USER_AUTH_PEOPLE,
  LINK_USER_AUTH_SING_UP,
  LINK_USER_AUTH_USER,
} from '../utils/httpLinks'
import api from './ApiProvider'

export const getUsers = async (
  number: number,
  usersOnPage: number,
): Promise<IUsers> => {
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
): Promise<Omit<IUserType, 'password' | '__v'>> => {
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
        userId: currentUser._id,
        // token: token,
        token,
      }),
    )

    toast.success('Acount was Created')

    return currentUser
  }
  throw toast.success('Acount was not Created')
}

export const login = async (email: string, password: string) => {
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

// export const login = async (
//   email: string,
//   password: string,
// ): Promise<Omit<IUserType, 'password' | '__v'>> => {
//   const res = await api.doFetch('post', LINK_USER_AUTH_LOG_IN, {
//     email,
//     password,
//   })

//   if (res) {
//     const user = res.data

//     localStorage.setItem(
//       storageDataName,
//       JSON.stringify({
//         userId: user.userId,
//         token: user.token,
//       }),
//     )

//     throw toast.success('Welcome')
//   }

//   throw toast.error('invalid data')
// }
