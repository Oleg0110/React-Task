import { action, makeObservable, observable } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_DASHBOARD, LINK_DASHBOARD_LIST, LINK_DASHBOARD_TASK } from "../../utils/httpLinks";

class BoardStore {
   lists = []

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         pushTask: action,
         dragLists: action,
         dragInList: action,
         setLists: action,
      })
      // this.loadProjects()
   }


   setLists = async () => {
      const res = await axios.get(LINK_DASHBOARD)
      const lists = res.data
      this.lists = lists
   }

   pushList = async (title) => {
      try {
         const res = await axios.post(LINK_DASHBOARD_LIST, { title })
         const list = res.data
         this.lists.push(list)

      } catch (error) {
         toast.error("invalid data")
      }
   }

   pushTask = async (text, id) => {
      try {
         const res = await axios.post(LINK_DASHBOARD_TASK, { text, id })
         const task = res.data
         const foundListId = this.lists.find(find => find.id === id)
         foundListId.tasks.push(task);
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

   dragLists(result) {
      if (!result.destination) return;
      const source = this.lists.find(found => found.id === result.source.droppableId)
      const destination = this.lists.find(found => found.id === result.destination.droppableId)
      const [reorderedItem] = source.tasks.splice(result.source.index, 1);
      destination.tasks.splice(result.destination.index, 0, reorderedItem);
   }
}


export default new BoardStore()