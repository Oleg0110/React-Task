import { LINK_PROJECTS } from '../utils/httpLinks'
// import { IProject } from '../utils/interface'
// import api from '../stores/ApiProviderStore/ApiProviderStore'

// export const getProjects = async (userId: string): Promise<IProject[]> => {
//   const res = await api.doFetch('get', `${LINK_PROJECTS}/${userId}`)

//   return res?.data
// }

// export const push = async (
//   title: string,
//   content: string,
//   idUser: string,
//   userEmail: any,
// ): Promise<IProject> => {
//   const res = await api.doFetch('post', LINK_PROJECTS, {
//     title,
//     content,
//     idUser,
//     userEmail,
//   })

//   return res?.data
// }

// export const changedTitle = async (
//   title: string,
//   id: string,
// ): Promise<IProject> => {
//   const res = await api.doFetch('patch', `${LINK_PROJECTS}${'/title'}`, {
//     title,
//     id,
//   })

//   return res?.data
// }

// export const changedContent = async (
//   content: string,
//   id: string,
// ): Promise<IProject> => {
//   const res = await api.doFetch('patch', `${LINK_PROJECTS}${'/content'}`, {
//     content,
//     id,
//   })

//   return res?.data
// }

// export const deleted = async (id: string) => {
//   await api.doFetch('delete', `${LINK_PROJECTS}/${id}`)
// }
