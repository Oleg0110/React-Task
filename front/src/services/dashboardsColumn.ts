import { LINK_DASHBOARD_COLUMN } from '../utils/httpLinks'
// import { IColumn } from '../utils/interface'
// import api from '../stores/ApiProviderStore/ApiProviderStore'

// export const getColumn = async (
//   projectId: string,
// ): Promise<Omit<IColumn[], 'tasks'>> => {
//   const res = await api.doFetch('get', `${LINK_DASHBOARD_COLUMN}/${projectId}`)

//   return res?.data
// }

// export const push = async (
//   title: string,
//   projectId: string,
// ): Promise<IColumn> => {
//   const res = await api.doFetch('post', LINK_DASHBOARD_COLUMN, {
//     title,
//     projectId,
//   })

//   return res?.data
// }

// export const change = async (title: string, id: string): Promise<IColumn> => {
//   const res = await api.doFetch('patch', LINK_DASHBOARD_COLUMN, { title, id })

//   return res?.data
// }

// export const deleted = async (id: string) => {
//   await api.doFetch('delete', `${LINK_DASHBOARD_COLUMN}/${id}`)
// }
