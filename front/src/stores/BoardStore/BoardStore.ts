import { action, makeObservable, observable } from 'mobx'
import { DropResult } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'
import { IColumn, ITask } from '../../utils/interFace'

import RootStore from '../RootStore/RootStore'

class BoardStore {
  column: IColumn[] = []

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      column: observable,
      pushColumn: action,
      changeColumn: action,
      deletedColumn: action,
      asyncGetTasks: action,
      pushTask: action,
      changeTask: action,
      deleteTask: action,
      dragColumn: action,
      // dragInColumn: action,
      asyncGetColumn: action,
      setColumn: action,
      setTasks: action,
      asigneeUser: action,
      deleteAsigneeUser: action,
      setDeleteTask: action,
      setChangeTask: action,
      setAddedTask: action,
      setAddedColumn: action,
      setDeletedColumn: action,
      setDeleteAsignee: action,
      setAsigneeUser: action,
    })
  }

  asyncGetColumn = async (projectId: string) => {
    const { getColumn } = this.rootStore.apiProvider.dashboardsColumnApi

    const column = await getColumn(projectId)

    this.setColumn(column)

    this.column.map((element) => this.asyncGetTasks(element.id))
  }

  setColumn = (column: IColumn[]) => {
    this.column = column
  }

  pushColumn = async (title: string, projectId: string) => {
    const { push } = this.rootStore.apiProvider.dashboardsColumnApi

    const column = await push(title, projectId)

    if (column) {
      this.setAddedColumn(column)
    }
  }

  setAddedColumn = (column: IColumn) => {
    this.column.push(column)
  }

  changeColumn = async (title: string, id: string) => {
    const { change } = this.rootStore.apiProvider.dashboardsColumnApi

    const foundColumn = this.column.find((found) => found.id === id)
    if (foundColumn) {
      foundColumn.title = title
    }

    const changedColumnTitle = await change(title, id)

    if (!changedColumnTitle) {
      toast.warn('invalid data')
    }
  }

  deletedColumn = async (id: string) => {
    const { deleted } = this.rootStore.apiProvider.dashboardsColumnApi

    const result = await deleted(id)

    if (result) {
      const foundColumnIndex = this.column.findIndex((found) => found.id === id)

      this.setDeletedColumn(foundColumnIndex)
    }
  }

  setDeletedColumn = (foundColumnIndex: number) => {
    this.column.splice(foundColumnIndex, 1)
  }

  asyncGetTasks = async (columnId: string) => {
    const { getTasks } = this.rootStore.apiProvider.dashboardsTasksApi

    const tasks = await getTasks(columnId)

    const foundColumn = this.column.find((found) => found.id === columnId)

    if (foundColumn) {
      this.setTasks(tasks, foundColumn)
    }
  }

  setTasks = (tasks: ITask[], foundColumn: IColumn) => {
    const column = foundColumn

    column.tasks = tasks
  }

  pushTask = async (text: string, id: string, projectId: string) => {
    const { taskPush } = this.rootStore.apiProvider.dashboardsTasksApi

    const foundColumnId = this.column.find((find) => find.id === id)

    const index = foundColumnId?.tasks.map((data) => data.index)
    let indexNumber = 0

    if (index && foundColumnId) {
      for (let i = 0; i <= index.length; i += 1) {
        indexNumber = i
      }
    }

    if (index?.length === 0) {
      const task = await taskPush(text, id, projectId, 0)

      foundColumnId && this.setAddedTask(foundColumnId, task)
    }

    if (index && index?.length !== 0 && index?.length <= indexNumber) {
      const task = await taskPush(text, id, projectId, indexNumber)

      foundColumnId && this.setAddedTask(foundColumnId, task)
    }
  }

  setAddedTask = (foundColumnId: IColumn, task: ITask) => {
    foundColumnId?.tasks.push(task)
  }

  changeTask = async (text: string, id: string, columnId: string) => {
    const { taskChanged } = this.rootStore.apiProvider.dashboardsTasksApi

    const changedTask = await taskChanged(text, id)

    const foundColumn = this.column.find((found) => found.id === columnId)

    const foundTask = foundColumn?.tasks.find((found) => found.id === id)

    if (changedTask && foundTask) {
      this.setChangeTask(foundTask, changedTask)
    }
  }

  setChangeTask = (foundTask: ITask, changedTask: string) => {
    foundTask.text = changedTask
  }

  deleteTask = async (id: string, columnId: string) => {
    const { taskDelete } = this.rootStore.apiProvider.dashboardsTasksApi

    const deletedTask = await taskDelete(id, columnId)

    const foundColumn = this.column.find((found) => found.id === columnId)

    if (foundColumn && deletedTask) {
      this.setDeleteTask(foundColumn, deletedTask)
    }
  }

  setDeleteTask = (foundColumn: IColumn, deletedTask: ITask[]) => {
    foundColumn.tasks = deletedTask
  }

  // dragInColumn(result:object, idColumn:string) {

  //    if (this.column.length) {
  //       const column = this.column.find((data) => data.id === idColumn);

  //       if (!result.destination) return;

  //       const [reorderedItem] = column.tasks.splice(result.source.index, 1);
  //       column.tasks.splice(result.destination.index, 0, reorderedItem);
  //    }

  // }

  dragColumn = async (result: DropResult) => {
    const { taskPosition } = this.rootStore.apiProvider.dashboardsTasksApi

    if (
      result.destination &&
      result.source.droppableId === result.destination.droppableId
    ) {
      if (result.source.index < result.destination.index) {
        const sourceColumn = this.column?.find(
          (found) => found.id === result.source.droppableId,
        )

        const foundsourcetask = sourceColumn?.tasks.find(
          (found) => found.index === result.source.index,
        )

        sourceColumn?.tasks.forEach((data) => {
          if (result.destination) {
            if (
              result.source.index < data.index &&
              data.index <= result.destination.index
            ) {
              data.index -= 1
            }
          }
        })

        if (foundsourcetask) {
          foundsourcetask.index = result.destination.index
        }

        sourceColumn?.tasks.sort((a, b) => a.index - b.index)
      }

      if (result.source.index > result.destination.index) {
        const sourceColumn = this.column?.find(
          (found) => found.id === result.source.droppableId,
        )

        const foundsourcetask = sourceColumn?.tasks.find(
          (found) => found.index === result.source.index,
        )

        sourceColumn?.tasks.forEach((data) => {
          if (
            result.destination &&
            result.source.index > data.index &&
            data.index >= result.destination.index
          ) {
            data.index += 1
          }
        })

        if (foundsourcetask) {
          foundsourcetask.index = result.destination.index
        }

        sourceColumn?.tasks.sort((a, b) => a.index - b.index)
      }
    }

    if (
      result.destination &&
      result.source.droppableId !== result.destination.droppableId
    ) {
      const sourceColumn = this.column?.find(
        (found) => found.id === result.source.droppableId,
      )

      const destinationColumn = this.column?.find(
        (found) => found.id === result.destination?.droppableId,
      )

      destinationColumn?.tasks.forEach((data) => {
        if (result.destination && data.index >= result.destination.index) {
          data.index += 1
        }
      })

      const foundSourceTask = sourceColumn?.tasks.find(
        (found) => found.index === result.source.index,
      )

      if (foundSourceTask) {
        foundSourceTask.index = result.destination.index
        foundSourceTask.columnOwner = result.destination.droppableId

        destinationColumn?.tasks.push(foundSourceTask)
      }

      destinationColumn?.tasks.sort((a, b) => a.index - b.index)

      sourceColumn?.tasks.splice(result.source.index, 1)

      sourceColumn?.tasks.forEach((data) => {
        if (data.index > result.source.index) {
          data.index -= 1
        }
      })

      sourceColumn?.tasks.sort((a, b) => a.index - b.index)
    }

    const resultPosition: string = await taskPosition(result)

    if (!resultPosition) {
      toast.warn('invalid data')
    }
  }

  asigneeUser = async (
    userId: string,
    taskId: string,
    projectId: string,
    columnId: string,
  ) => {
    const { setAsignee } = this.rootStore.apiProvider.dashboardsTasksApi

    const updateTask = await setAsignee(userId, taskId, projectId)

    const foundColumn =
      updateTask && this.column.find((found) => found.id === columnId)

    if (updateTask) {
      const foundTaskIndex = foundColumn?.tasks.findIndex(
        (found: { id: string }) => found.id === taskId,
      )

      this.setAsigneeUser(foundColumn, foundTaskIndex, updateTask)
    }
  }

  setAsigneeUser = async (
    foundColumn: IColumn,
    foundTaskIndex: number,
    updateTask: ITask,
  ) => {
    foundColumn?.tasks.splice(foundTaskIndex, 1, updateTask)
  }

  deleteAsigneeUser = async (
    noAsignee: string,
    taskId: string,
    projectId: string,
    userId: string,
    columnId: string,
  ) => {
    const { deleteAsignee } = this.rootStore.apiProvider.dashboardsTasksApi

    const deletedAsignee = await deleteAsignee(
      noAsignee,
      taskId,
      projectId,
      userId,
    )

    const foundColumn =
      deletedAsignee && this.column.find((found) => found.id === columnId)

    if (deletedAsignee) {
      const foundTaskIndex = foundColumn?.tasks.findIndex(
        (found: { id: string }) => found.id === taskId,
      )

      this.setDeleteAsignee(foundColumn, foundTaskIndex, deletedAsignee)
    }
  }

  setDeleteAsignee = (
    foundColumn: IColumn,
    foundTaskIndex: number,
    deletedAsignee: ITask,
  ) => {
    foundColumn?.tasks.splice(foundTaskIndex, 1, deletedAsignee)
  }
}

export default BoardStore
