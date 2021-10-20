import { action, makeObservable, observable } from 'mobx'
import { IColumnType, ITaskType } from 'utils/types'
import {
  change,
  deleted,
  getColumn,
  push,
} from '../../services/dashboardsColumn'
import {
  getTasks,
  taskChanged,
  taskDelete,
  taskPush,
} from '../../services/dashboardsTasks'

class BoardStore {
  column: IColumnType[] = []

  constructor() {
    makeObservable(this, {
      column: observable,
      pushColumn: action,
      changeColumn: action,
      deletedColumn: action,
      asyncGetTasks: action,
      pushTask: action,
      changeTask: action,
      deleteTask: action,
      // dragColumn: action,
      // dragInColumn: action,
      asyncGetColumn: action,
      setColumn: action,
      setTasks: action,
    })
  }

  asyncGetColumn = async (projectId: string) => {
    const column = await getColumn(projectId)

    this.setColumn(column)

    this.column.map((element) => this.asyncGetTasks(element.id))
  }

  setColumn = (column: IColumnType[]) => {
    this.column = column
  }

  pushColumn = async (title: string, projectId: string) => {
    const column = await push(title, projectId)
    this.column.push(column)
  }

  changeColumn = async (title: string, id: string) => {
    const changedColumn = await change(title, id)
    const foundColumnIndex = this.column.findIndex((found) => found.id === id)

    this.column.splice(foundColumnIndex, 1, changedColumn)
  }

  deletedColumn = async (id: string) => {
    await deleted(id)
    const foundColumnIndex = this.column.findIndex((found) => found.id === id)

    this.column.splice(foundColumnIndex, 1)
  }

  asyncGetTasks = async (columnId: string) => {
    const tasks = await getTasks(columnId)
    const foundColumn = this.column.find((found) => found.id === columnId)

    if (foundColumn) {
      this.setTasks(tasks, foundColumn)
    }
  }

  setTasks = (tasks: ITaskType[], foundColumn: IColumnType) => {
    foundColumn.tasks = tasks
  }

  pushTask = async (text: string, id: string, projectId: string) => {
    const task = await taskPush(text, id, projectId)
    // !!! ToDo any
    const foundColumnId: any = this.column.find((find) => find.id === id)
    console.log(foundColumnId)

    foundColumnId.tasks.push(task)
  }

  changeTask = async (text: string, id: string, columnId: string) => {
    const changedTask = await taskChanged(text, id)

    const foundColumn: any = this.column.find((found) => found.id === columnId)
    const foundTask = foundColumn.tasks.findIndex(
      (found: { id: string }) => found.id === id,
    )

    foundColumn.tasks.splice(foundTask, 1, changedTask)
  }

  deleteTask = async (id: string, columnId: string) => {
    await taskDelete(id)

    const foundColumn: any = this.column.find((found) => found.id === columnId)
    const foundTask = foundColumn.tasks.findIndex(
      (found: { id: string }) => found.id === id,
    )

    foundColumn.tasks.splice(foundTask, 1)
  }

  // dragInColumn(result:object, idColumn:string) {

  //    if (this.column.length) {
  //       const column = this.column.find((data) => data.id === idColumn);

  //       if (!result.destination) return;

  //       const [reorderedItem] = column.tasks.splice(result.source.index, 1);
  //       column.tasks.splice(result.destination.index, 0, reorderedItem);
  //    }

  // }

  // dragColumn = async (result) => {
  //    try {
  //       const res = await axiosWrraper.patch(`${LINK_DASHBOARD}${"/task-position"}`, { result })
  //       const changedProjectPosition = res.data
  //       this.column = changedProjectPosition
  //    } catch (error) {
  //       toast.error("invalid data")
  //    }
  // }
}

export default new BoardStore()
