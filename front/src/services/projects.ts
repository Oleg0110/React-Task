import { IProjectType } from 'utils/types'
import { LINK_PROJECTS } from '../utils/httpLinks'
import api from './ApiProvider'

export const getProjects = async (userId: string): Promise<IProjectType[]> => {
  const res = await api.doFetch('get', `${LINK_PROJECTS}/${userId}`)

  return res?.data
}

export const push = async (
  title: string,
  content: string,
  userId: string,
): Promise<IProjectType> => {
  const res = await api.doFetch('post', LINK_PROJECTS, {
    title,
    content,
    userId,
  })

  return res?.data
}
// : Promise<Omit<IProjectType,"content","_id", "__v","userOwner">>
export const changedTitle = async (title: string, id: string) => {
  const res = await api.doFetch('patch', `${LINK_PROJECTS}${'/title'}`, {
    title,
    id,
  })

  return res?.data
}
// : Promise<Omit<IProjectType,"title","_id", "__v","userOwner">>
export const changedContent = async (content: string, id: string) => {
  const res = await api.doFetch('patch', `${LINK_PROJECTS}${'/content'}`, {
    content,
    id,
  })

  return res?.data
}

export const deleted = async (id: string) => {
  await api.doFetch('delete', `${LINK_PROJECTS}/${id}`)
}

export const drag = async (result: object) => {
  const res = await api.doFetch('patch', `${LINK_PROJECTS}${'/position'}`, {
    result,
  })

  return res?.data
}
