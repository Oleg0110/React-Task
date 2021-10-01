import { action, makeObservable, observable } from "mobx"
import { toast } from 'react-toastify';
import { LINK_DASHBOARD, LINK_DASHBOARD_LISTS, LINK_DASHBOARD_TASKS } from "../../utils/httpLinks";
import { change, deleted, getLists, push } from "../../services/dashboardsLists";
import { getTasks, taskChanged, taskDelete, taskPush } from "../../services/dashboardsTasks";
import axiosWrraper from "../../services/axiosWrapper";

class BoardStore {
   lists = []

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         changeList: action,
         deletedList: action,
         asyncGetTasks: action,
         pushTask: action,
         changeTask: action,
         deleteTask: action,
         dragLists: action,
         dragInList: action,
         asyncGetLists: action,
         setLists: action,
         setTasks: action,
      })
      // this.loadProjects()

   }


   asyncGetLists = async (projectId) => {
      // const lists = await getLists(projectId)

      // this.setLists(lists)
      // this.lists.map(element => {
      //    this.asyncGetTasks(element._id);
      // })

      try {
         const res = await axiosWrraper.get(`${LINK_DASHBOARD_LISTS}/${projectId}`)
         const lists = res.data

         this.setLists(lists)
         this.lists.map(element => {
            this.asyncGetTasks(element._id);
         })
      } catch (error) {
         toast.error("invalid data")
      }
   }

   setLists = (lists) => {
      this.lists = lists
   }

   pushList = async (title, projectId) => {

      const list = await push(title, projectId)
      this.lists.push(list)
   }

   changeList = async (title, id) => {

      const changedList = await change(title, id)
      const foundListIndex = this.lists.findIndex(found => found.id === id)

      this.lists.splice(foundListIndex, 1, changedList)
   }

   deletedList = async (id) => {

      await deleted(id)
      const foundListIndex = this.lists.findIndex(found => found._id === id)

      this.lists.splice(foundListIndex, 1)

   }

   asyncGetTasks = async (listId) => {

      // const tasks = await getTasks(listId)
      // const foundList = this.lists.find((found) => found._id === listId)

      // if (foundList) {
      //    this.setTasks(tasks, foundList)
      // }

      try {
         const res = await axiosWrraper.get(`${LINK_DASHBOARD_TASKS}/${listId}`)
         const tasks = res.data
         const foundList = this.lists.find((found) => found._id === listId)

         if (foundList) {
            this.setTasks(tasks, foundList)
         }

      } catch (error) {
         toast.error("invalid data")
      }
   }

   setTasks = (tasks, foundList) => {
      foundList.tasks = tasks;
   }

   pushTask = async (text, id, projectId) => {

      const task = await taskPush(text, id, projectId)

      const foundListId = this.lists.find(find => find._id === id)
      const foundListIndex = this.lists.findIndex(found => found._id === id)

      foundListId.tasks.push(task);
   }

   changeTask = async (text, id, listId) => {

      const changedTask = await taskChanged(text, id)

      const foundList = this.lists.find(found => found._id === listId)
      const foundTask = foundList.tasks.findIndex(found => found._id === id)

      foundList.tasks.splice(foundTask, 1, changedTask)
   }

   deleteTask = async (id, listId) => {

      await taskDelete(id)

      const foundList = this.lists.find(found => found._id === listId)
      const foundTask = foundList.tasks.findIndex(found => found._id === id)

      foundList.tasks.splice(foundTask, 1)
   }


   dragInList(result, idList) {

      if (this.lists.length) {
         const list = this.lists.find((data) => data.id === idList);

         if (!result.destination) return;

         const [reorderedItem] = list.tasks.splice(result.source.index, 1);
         list.tasks.splice(result.destination.index, 0, reorderedItem);
      }

   }


   dragLists = async (result) => {
      try {
         const res = await axiosWrraper.patch(`${LINK_DASHBOARD}${"/task-position"}`, { result })
         const changedProjectPosition = res.data
         this.lists = changedProjectPosition
      } catch (error) {
         toast.error("invalid data")
      }
   }
}


export default new BoardStore()