import { LINK_DASHBOARD_COLUMN } from '../utils/httpLinks'
import { IColumn } from '../utils/interface'
import RootStore from '../stores/RootStore/RootStore'

class DashboardsColumnApi {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  getColumn = async (projectId: string): Promise<Omit<IColumn[], 'tasks'>> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_DASHBOARD_COLUMN}/${projectId}`,
    )

    return res?.data
  }

  push = async (title: string, projectId: string): Promise<IColumn> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      LINK_DASHBOARD_COLUMN,
      {
        title,
        projectId,
      },
    )

    return res?.data
  }

  change = async (title: string, id: string): Promise<string> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'patch',
      LINK_DASHBOARD_COLUMN,
      { title, id },
    )

    return res?.data
  }

  deleted = async (id: string) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'delete',
      `${LINK_DASHBOARD_COLUMN}/${id}`,
    )

    return res.data
  }
}

export default DashboardsColumnApi
