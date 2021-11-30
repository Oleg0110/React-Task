import { DropResult } from 'react-beautiful-dnd'
import { LINK_DASHBOARD, LINK_DASHBOARD_TASKS } from '../utils/httpLinks'
import { ITask } from '../utils/interface'
import RootStore from '../stores/RootStore/RootStore'

class DashboardsTasksApi {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  getTasks = async (columnId: string): Promise<ITask[]> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'get',
      `${LINK_DASHBOARD_TASKS}/${columnId}`,
    )

    return res?.data
  }

  taskPush = async (
    text: string,
    id: string,
    projectId: string,
    indexNumber: number,
  ): Promise<ITask> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      LINK_DASHBOARD_TASKS,
      {
        text,
        id,
        projectId,
        indexNumber,
      },
    )

    return res?.data
  }

  taskChanged = async (text: string, id: string): Promise<string> => {
    const res = await this.rootStore.apiProvider.doFetch(
      'patch',
      LINK_DASHBOARD_TASKS,
      { text, id },
    )

    return res?.data
  }

  taskDelete = async (id: string, columnId: string) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'delete',
      `${LINK_DASHBOARD_TASKS}/${id}/${columnId}`,
    )

    return res?.data
  }

  setAsignee = async (userId: string, taskId: string, projectId: string) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      `${LINK_DASHBOARD}/${'asignee-user'}`,
      {
        userId,
        taskId,
        projectId,
      },
    )

    return res?.data
  }

  deleteAsignee = async (
    noAsignee: string,
    taskId: string,
    projectId: string,
    userId: string,
  ) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'post',
      `${LINK_DASHBOARD}/${'no-asignee'}`,
      {
        noAsignee,
        taskId,
        projectId,
        userId,
      },
    )

    return res?.data
  }

  taskPosition = async (result: DropResult) => {
    const res = await this.rootStore.apiProvider.doFetch(
      'patch',
      `${LINK_DASHBOARD}/${'task-position'}`,
      { result },
    )

    return res?.data
  }
}

export default DashboardsTasksApi
