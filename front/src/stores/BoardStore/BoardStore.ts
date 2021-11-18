import { action, makeObservable, observable, toJS } from 'mobx'
import { DropResult } from 'react-beautiful-dnd'
import RootStore from '../RootStore/RootStore'
import { IColumn, ITask } from '../../utils/interface'

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
      setChangedColumn: action,
      setDeletedColumn: action,
      setDeleteAsignee: action,
      setAsigneeUser: action,
      setTaskSourcePosition: action,
      setTaskDestinationPosition: action,
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

    const changedColumn = await change(title, id)

    if (changedColumn) {
      const foundColumnIndex = this.column.findIndex((found) => found.id === id)

      this.setChangedColumn(foundColumnIndex, changedColumn)
    }
  }

  setChangedColumn = (foundColumnIndex: number, changedColumn: IColumn) => {
    this.column.splice(foundColumnIndex, 1, changedColumn)
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

  setAddedTask = (foundColumnId: IColumn, task: ITask[]) => {
    foundColumnId.tasks = task
    // foundColumnId?.tasks.push(task)
  }

  changeTask = async (text: string, id: string, columnId: string) => {
    const { taskChanged } = this.rootStore.apiProvider.dashboardsTasksApi

    const changedTask = await taskChanged(text, id)

    const foundColumn = this.column.find((found) => found.id === columnId)

    if (foundColumn && changedTask) {
      const foundTask = foundColumn.tasks.findIndex((found) => found.id === id)

      this.setChangeTask(foundColumn, foundTask, changedTask)
    }
  }

  setChangeTask = (
    foundColumn: IColumn,
    foundTask: number,
    changedTask: ITask,
  ) => {
    foundColumn.tasks.splice(foundTask, 1, changedTask)
  }

  deleteTask = async (id: string, columnId: string) => {
    const { taskDelete } = this.rootStore.apiProvider.dashboardsTasksApi

    const deletedTask = await taskDelete(id, columnId)

    const foundColumn = this.column.find((found) => found.id === columnId)

    if (foundColumn && deletedTask) {
      // const foundTask = foundColumn.tasks.findIndex((found) => found.id === id)

      this.setDeleteTask(foundColumn, deletedTask)
    }
  }

  setDeleteTask = (foundColumn: IColumn, deletedTask: ITask[]) => {
    // foundColumn.tasks.splice(foundTask, 1)
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

    const resultPosition = await taskPosition(result)

    const sourceColumn =
      resultPosition &&
      this.column?.find((found) => found.id === result.source.droppableId)

    if (
      result &&
      resultPosition &&
      result.source?.droppableId !== result.destination?.droppableId
    ) {
      const destination = this.column.find(
        (found) => found.id === result.destination?.droppableId,
      )
      const source = this.column.find(
        (found) => found.id === result.source?.droppableId,
      )

      if (destination && source && resultPosition) {
        this.setTaskDestinationPosition(destination, source, resultPosition)
        // const sources = this.column.find(found => found.id === result.source.droppableId)
        // const destinations = this.column.find(
        //   (found) => found.id === result.destination.droppableId,
        // )

        // const [reorderedItem] = source.tasks.splice(result.source.index, 1);
        // destination.tasks.splice(result.destination.index, 0, reorderedItem);

        // destination.tasks = resultPosition.sortDestinationTasks
        // source.tasks = resultPosition.sortSourceTasks

        return
      }
    }

    if (resultPosition) {
      this.setTaskSourcePosition(sourceColumn, resultPosition)
    }
  }

  setTaskSourcePosition = (sourceColumn: IColumn, resultPosition: ITask[]) => {
    sourceColumn.tasks = resultPosition
  }

  setTaskDestinationPosition = (
    destination: IColumn,
    source: IColumn,
    resultPosition: { sortSourceTasks: ITask[]; sortDestinationTasks: ITask[] },
  ) => {
    destination.tasks = resultPosition.sortDestinationTasks
    source.tasks = resultPosition.sortSourceTasks
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

  setAsigneeUser = (
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
