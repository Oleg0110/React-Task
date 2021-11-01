import { ITaskType } from '../utils/types'
import { LINK_DASHBOARD_TASKS } from '../utils/httpLinks'
import api from './ApiProvider'

export const getTasks = async (columnId: string): Promise<ITaskType[]> => {
  const res = await api.doFetch('get', `${LINK_DASHBOARD_TASKS}/${columnId}`)

  return res?.data
}

export const taskPush = async (
  text: string,
  id: string,
  projectId: string,
): Promise<ITaskType> => {
  const res = await api.doFetch('post', LINK_DASHBOARD_TASKS, {
    text,
    id,
    projectId,
  })

  return res?.data
}

export const taskChanged = async (
  text: string,
  id: string,
): Promise<ITaskType> => {
  const res = await api.doFetch('patch', LINK_DASHBOARD_TASKS, { text, id })

  return res?.data
}

export const taskDelete = async (id: string) => {
  await api.doFetch('delete', `${LINK_DASHBOARD_TASKS}/${id}`)
}

export const setAsignee = async (id: string, taskId: string) => {
  const res = await api.doFetch(
    'post',
    'http://localhost:5000/dashboards/asignee-user',
    { id, taskId },
  )

  return res?.data
}

export const deleteAsignee = async (noAsignee: string, taskId: string) => {
  const res = await api.doFetch(
    'post',
    'http://localhost:5000/dashboards/no-asignee',
    { noAsignee, taskId },
  )

  return res?.data
}
