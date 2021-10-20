import { action, makeObservable, observable } from 'mobx'
import { IProjectType } from 'utils/types'
import { UserStore } from '..'
import {
  changedContent,
  changedTitle,
  deleted,
  drag,
  getProjects,
  push,
} from '../../services/projects'

class ProjectsStore {
  projects: IProjectType[] = []

  constructor() {
    makeObservable(this, {
      projects: observable,
      pushProject: action,
      dragProject: action,
      deletedProject: action,
      changedProjecTitle: action,
      changedProjecContent: action,
      asyncGetProjects: action,
      setProjects: action,
      setDragProject: action,
    })
  }

  asyncGetProjects = async () => {
    // const userId = UserStore.userId
    const { userId } = UserStore

    const projects = await getProjects(userId)

    this.setProjects(projects)
  }

  setProjects = (projects: IProjectType[]) => {
    this.projects = projects
  }

  pushProject = async (title: string, content: string) => {
    const user = UserStore.userId

    const project = await push(title, content, user)
    this.projects.push(project)
  }

  changedProjecTitle = async (title: string, id: string) => {
    const changedProjectTitle = await changedTitle(title, id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.projects.splice(foundProjectIndex, 1, changedProjectTitle)
  }

  changedProjecContent = async (content: string, id: string) => {
    const changedProjectContent = await changedContent(content, id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.projects.splice(foundProjectIndex, 1, changedProjectContent)
  }

  deletedProject = async (id: string) => {
    await deleted(id)
    const foundProjectIndex = this.projects.findIndex(
      (found) => found.id === id,
    )

    this.projects.splice(foundProjectIndex, 1)
  }

  dragProject = async (result: object) => {
    const changedProjectPosition = await drag(result)

    this.setDragProject(changedProjectPosition)
  }

  setDragProject = (result: IProjectType[]) => {
    this.projects = result
  }
}

export default new ProjectsStore()
