import { makeObservable, observable } from 'mobx'
import { createContext } from 'react'
import UserStore from '../UserStore/UserStore'
import ProjectsStore from '../ProjectsStore/ProjectsStore'
import ApiProviderStore from '../ApiProviderStore/ApiProviderStore'
import BoardStore from '../BoardStore/BoardStore'

class RootStore {
  userStore: UserStore

  projectStore: ProjectsStore

  boardStore: BoardStore

  apiProvider: ApiProviderStore

  constructor() {
    makeObservable(this, {
      userStore: observable,
      projectStore: observable,
    })

    this.userStore = new UserStore(this)
    this.projectStore = new ProjectsStore(this)
    this.boardStore = new BoardStore(this)
    this.apiProvider = new ApiProviderStore(this)
  }
}

export default RootStore

export const RootStoreContext = createContext(new RootStore())
