import { action, makeObservable, observable } from 'mobx'
import { IProject } from '../../utils/interface'
import RootStore from '../RootStore/RootStore'

class ProjectsStore {
  projects: IProject[] = []

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      projects: observable,
      pushProject: action,
      deletedProject: action,
      changedProjecTitle: action,
      changedProjecContent: action,
      asyncGetProjects: action,
      setProjects: action,
      setProject: action,
      setChangeTitle: action,
      setChangeContent: action,
      setDeleteProject: action,
    })
  }

  asyncGetProjects = async () => {
    const { userId } = this.rootStore.userStore
    const { getProjects } = this.rootStore.apiProvider.projectApi
    const projects = await getProjects(userId)

    this.setProjects(projects)
  }

  setProjects = (projects: IProject[]) => {
    this.projects = projects
  }

  pushProject = async (title: string, content: string) => {
    const { userId, user } = this.rootStore.userStore
    const { push } = this.rootStore.apiProvider.projectApi
    const userEmail = user?.email

    const project = await push(title, content, userId, userEmail)
    this.setProject(project)
  }

  setProject = (project: IProject) => {
    this.projects.push(project)
  }

  changedProjecTitle = async (title: string, id: string) => {
    const { changedTitle } = this.rootStore.apiProvider.projectApi
    const changedProjectTitle = await changedTitle(title, id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.setChangeTitle(foundProjectIndex, changedProjectTitle)
  }

  setChangeTitle = (
    foundProjectIndex: number,
    changedProjectTitle: IProject,
  ) => {
    this.projects.splice(foundProjectIndex, 1, changedProjectTitle)
  }

  changedProjecContent = async (content: string, id: string) => {
    const { changedContent } = this.rootStore.apiProvider.projectApi
    const changedProjectContent = await changedContent(content, id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.setChangeContent(foundProjectIndex, changedProjectContent)
  }

  setChangeContent = (
    foundProjectIndex: number,
    changedProjectContent: IProject,
  ) => {
    this.projects.splice(foundProjectIndex, 1, changedProjectContent)
  }

  deletedProject = async (id: string) => {
    const { deleted } = this.rootStore.apiProvider.projectApi
    await deleted(id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )
    this.setDeleteProject(foundProjectIndex)
  }

  setDeleteProject = (foundProjectIndex: number) => {
    this.projects.splice(foundProjectIndex, 1)
  }
}

export default ProjectsStore
