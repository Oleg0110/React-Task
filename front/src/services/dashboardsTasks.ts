import { LINK_DASHBOARD, LINK_DASHBOARD_TASKS } from '../utils/httpLinks'
// import { ITask } from '../utils/interface'
// import api from '../stores/ApiProviderStore/ApiProviderStore'

// export const getTasks = async (columnId: string): Promise<ITask[]> => {
//   const res = await api.doFetch('get', `${LINK_DASHBOARD_TASKS}/${columnId}`)

//   return res?.data
// }

// export const taskPush = async (
//   text: string,
//   id: string,
//   projectId: string,
// ): Promise<ITask> => {
//   const res = await api.doFetch('post', LINK_DASHBOARD_TASKS, {
//     text,
//     id,
//     projectId,
//   })

//   return res?.data
// }

// export const taskChanged = async (text: string, id: string): Promise<ITask> => {
//   const res = await api.doFetch('patch', LINK_DASHBOARD_TASKS, { text, id })

//   return res?.data
// }

// export const taskDelete = async (id: string) => {
//   await api.doFetch('delete', `${LINK_DASHBOARD_TASKS}/${id}`)
// }

// export const setAsignee = async (id: string, taskId: string) => {
//   const res = await api.doFetch('post', `${LINK_DASHBOARD}/${'asignee-user'}`, {
//     id,
//     taskId,
//   })

//   return res?.data
// }

// export const deleteAsignee = async (noAsignee: string, taskId: string) => {
//   const res = await api.doFetch('post', `${LINK_DASHBOARD}/${'no-asignee'}`, {
//     noAsignee,
//     taskId,
//   })

//   return res?.data
// }
