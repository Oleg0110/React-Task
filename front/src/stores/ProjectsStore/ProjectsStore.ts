import { action, makeObservable, observable } from 'mobx'
import { IProjectType } from '../../utils/types'
import { UserStore } from '..'
import {
  changedContent,
  changedTitle,
  deleted,
  getProjects,
  push,
} from '../../services/projects'

class ProjectsStore {
  projects: IProjectType[] = []

  constructor() {
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
    const { userId } = UserStore

    const projects = await getProjects(userId)

    this.setProjects(projects)
  }

  setProjects = (projects: IProjectType[]) => {
    this.projects = projects
  }

  pushProject = async (title: string, content: string) => {
    const idUser = UserStore.userId
    const userEmail = UserStore.user?.email

    const project = await push(title, content, idUser, userEmail)
    this.setProject(project)
  }

  setProject = (project: IProjectType) => {
    this.projects.push(project)
  }

  changedProjecTitle = async (title: string, id: string) => {
    const changedProjectTitle = await changedTitle(title, id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.setChangeTitle(foundProjectIndex, changedProjectTitle)
  }

  setChangeTitle = (
    foundProjectIndex: number,
    changedProjectTitle: IProjectType,
  ) => {
    this.projects.splice(foundProjectIndex, 1, changedProjectTitle)
  }

  changedProjecContent = async (content: string, id: string) => {
    const changedProjectContent = await changedContent(content, id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.setChangeContent(foundProjectIndex, changedProjectContent)
  }

  setChangeContent = (
    foundProjectIndex: number,
    changedProjectContent: IProjectType,
  ) => {
    this.projects.splice(foundProjectIndex, 1, changedProjectContent)
  }

  deletedProject = async (id: string) => {
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

export default new ProjectsStore()
