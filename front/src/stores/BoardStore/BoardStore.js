import { action, makeObservable, observable } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_DASHBOARD, LINK_DASHBOARD_LISTS, LINK_DASHBOARD_TASKS } from "../../utils/httpLinks";

class BoardStore {
   lists = []

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         changeList: action,
         deleteList: action,
         pushTask: action,
         changeTask: action,
         deleteTask: action,
         dragLists: action,
         dragInList: action,
         asyncGetLists: action,
      })
      // this.loadProjects()
   }


   asyncGetLists = async () => {
      const res = await axios.get(LINK_DASHBOARD)
      const lists = res.data
      this.lists = lists
   }

   pushList = async (title) => {
      try {
         const res = await axios.post(LINK_DASHBOARD_LISTS, { title })
         const list = res.data
         this.lists.push(list)

      } catch (error) {
         toast.error("invalid data")
      }
   }

   changeList = async (title, id) => {
      try {
         const res = await axios.patch(LINK_DASHBOARD_LISTS, { title, id })
         const chengedList = res.data
         const foundListIndex = this.lists.findIndex(found => found.id === id)
         this.lists.splice(foundListIndex, 1, chengedList)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   deleteList = async (id) => {
      try {
         const res = await axios.delete(`${LINK_DASHBOARD_LISTS}/${id}`)
         const deletedList = res.data
         this.lists.splice(deletedList, 1)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   pushTask = async (text, id) => {
      try {
         const res = await axios.post(LINK_DASHBOARD_TASKS, { text, id })
         const task = res.data
         const foundListId = this.lists.find(find => find.id === id)
         foundListId.tasks.push(task);
      } catch (error) {
         toast.error("invalid data")
      }
   }

   changeTask = async (text, id, listId) => {
      try {
         const res = await axios.patch(LINK_DASHBOARD_TASKS, { text, id, listId })
         const changedTask = res.data

         const foundList = this.lists.find(found => found.id === listId)
         const foundTask = foundList.tasks.findIndex(found => found.id === id)

         foundList.tasks.splice(foundTask, 1, changedTask)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   deleteTask = async (listId, id) => {
      try {
         const res = await axios.delete(`${LINK_DASHBOARD_TASKS}/${listId}/${id}`)
         const deletedTask = res.data

         const foundList = this.lists.find(found => found.id === id)

         foundList.tasks.splice(deletedTask, 1)
      } catch (error) {
         toast.error("invalid data")
      }
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
         const res = await axios.patch(`${LINK_DASHBOARD}${"/task-position"}`, { result })
         const changedProjectPosition = res.data
         this.lists = changedProjectPosition
      } catch (error) {
         toast.error("invalid data")
      }
   }
}


export default new BoardStore()