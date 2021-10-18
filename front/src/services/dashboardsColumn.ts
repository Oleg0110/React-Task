import { IColumnType } from 'utils/types'
import { LINK_DASHBOARD_COLUMN } from '../utils/httpLinks'
import api from './ApiProvider'

export const getColumn = async (projectId: string): Promise<IColumnType[]> => {
  const res = await api.doFetch('get', `${LINK_DASHBOARD_COLUMN}/${projectId}`)

  return res?.data
}

export const push = async (
  title: string,
  projectId: string,
): Promise<IColumnType> => {
  const res = await api.doFetch('post', LINK_DASHBOARD_COLUMN, {
    title,
    projectId,
  })

  return res?.data
}
// : Promise<Omit<IColumnType, '_id', 'projectOwner','tasks','__v'>>
export const change = async (title: string, id: string) => {
  const res = await api.doFetch('patch', LINK_DASHBOARD_COLUMN, { title, id })

  return res?.data
}

export const deleted = async (id: string) => {
  await api.doFetch('delete', `${LINK_DASHBOARD_COLUMN}/${id}`)
}
