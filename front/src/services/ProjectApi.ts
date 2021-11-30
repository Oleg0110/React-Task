import { LINK_PROJECTS } from '../utils/httpLinks'
import RootStore from '../stores/RootStore/RootStore'
import { IProject } from '../utils/interface'

class ProjectApi {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  getProjects = async (userId: string): Promise<IProject[]> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_PROJECTS}/${userId}`,
    )

    return res?.data
  }

  push = async (
    title: string,
    content: string,
    idUser: string,
    userEmail: string | undefined,
  ): Promise<IProject> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      LINK_PROJECTS,
      {
        title,
        content,
        idUser,
        userEmail,
      },
    )

    return res?.data
  }

  changedTitle = async (title: string, id: string): Promise<IProject> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'patch',
      `${LINK_PROJECTS}${'/title'}`,
      {
        title,
        id,
      },
    )

    return res?.data
  }

  changedContent = async (content: string, id: string): Promise<IProject> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'patch',
      `${LINK_PROJECTS}${'/content'}`,
      {
        content,
        id,
      },
    )

    return res?.data
  }

  deleted = async (id: string) => {
    await this.rootStore.apiProvider.doFetch('delete', `${LINK_PROJECTS}/${id}`)
  }
}

export default ProjectApi
