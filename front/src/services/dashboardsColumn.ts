import { IColumnType } from 'utils/types'
import { LINK_DASHBOARD_COLUMN } from '../utils/httpLinks'
import api from './ApiProvider'

export const getColumn = async (
  projectId: string,
): Promise<Omit<IColumnType[], 'tasks'>> => {
  const res = await api.doFetch('get', `${LINK_DASHBOARD_COLUMN}/${projectId}`)

  return res?.data
}

export const push = async (
  title: string,
  projectId: string,
): Promise<Omit<IColumnType, 'tasks'>> => {
  const res = await api.doFetch('post', LINK_DASHBOARD_COLUMN, {
    title,
    projectId,
  })

  return res?.data
}

export const change = async (
  title: string,
  id: string,
): Promise<Omit<IColumnType, 'tasks'>> => {
  const res = await api.doFetch('patch', LINK_DASHBOARD_COLUMN, { title, id })
  console.log(res?.data)
  return res?.data
}

export const deleted = async (id: string) => {
  await api.doFetch('delete', `${LINK_DASHBOARD_COLUMN}/${id}`)
}
