import { action, makeObservable } from 'mobx'
import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import RootStore from '../RootStore/RootStore'
import { BASIC_URL } from '../../utils/httpLinks'
import ProjectApi from '../../services/ProjectApi'
import UserApi from '../../services/UserApi'
import DashboardsColumnApi from '../../services/DashboardsColumnApi'
import DashboardsTasksApi from '../../services/DashboardsTasksApi'

class ApiProviderStore {
  private axiosWrapper: AxiosInstance

  rootStore: RootStore

  projectApi: ProjectApi

  userApi: UserApi

  dashboardsColumnApi: DashboardsColumnApi

  dashboardsTasksApi: DashboardsTasksApi

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.axiosWrapper = axios.create({ baseURL: BASIC_URL })
    this.projectApi = new ProjectApi(rootStore)
    this.userApi = new UserApi(rootStore)
    this.dashboardsColumnApi = new DashboardsColumnApi(rootStore)
    this.dashboardsTasksApi = new DashboardsTasksApi(rootStore)
    makeObservable(this, {
      doFetch: action,
    })
  }

  doFetch = async (
    requestType: 'put' | 'get' | 'patch' | 'post' | 'delete' = 'get',
    url: string,
    body?: object,
  ) => {
    try {
      if (requestType === 'get' || requestType === 'delete') {
        const twoTypes = await this.axiosWrapper[requestType](url, {
          headers: {
            Authorization: `Bearer ${this.rootStore.userStore.userToken}`,
          },
        })
        return twoTypes
      }
      const anotherType = await this.axiosWrapper[requestType](url, body, {
        headers: {
          Authorization: `Bearer ${this.rootStore.userStore.userToken}`,
        },
      })
      return anotherType
    } catch (error) {
      toast.error('invalid data')
      throw error
    }
  }
}

export default ApiProviderStore
