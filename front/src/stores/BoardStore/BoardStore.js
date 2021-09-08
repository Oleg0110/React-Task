import { action, makeObservable, observable } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_DASHBOARD_LIST, LINK_DASHBOARD_TASK } from "../../utils/httpLinks";

class BoardStore {
   lists = []

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         pushTask: action,
         dragLists: action,
         dragInList: action,
      })
      // this.loadProjects()
   }

   pushList = async (title) => {
      try {
         const res = await axios.post(LINK_DASHBOARD_LIST, { title })
         const list = res.data
         console.log(2, list);
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
         console.log(5, foundListId);
         foundListId.tasks.push(task);
      } catch (error) {
         toast.error("invalid data")
      }
   }

   // loadProjects = async () => {
   //    const res = await axios.get("http://localhost:5000/dashboards")
   //    console.log(res);
   // }

   // pushList(title) {
   //    let foundId = 0
   //    if (this.lists) {


   //       for (let i = 0; i < this.lists.length; i++) {

   //          if (this.lists[i].id > foundId) {
   //             foundId = this.lists[i].id
   //          }
   //       }
   //       foundId++
   //       this.lists.push({ title, id: foundId.toString(), tasks: [] });
   //    }

   // }

   // pushTask(text, id) {
   //    const foundLists = this.lists.find((data) => data.id === id)
   //    console.log(2, foundLists);
   //    let foundId = 0
   //    if (foundLists.tasks) {

   //       for (let i = 0; i < foundLists.tasks.length; i++) {
   //          console.log(foundLists.tasks.length);
   //          if (foundLists.tasks[i].id > foundId) {
   //             foundId = foundLists.tasks[i].id
   //          }
   //       }
   //       foundId++
   //       foundLists.tasks.push({ text, id: foundId.toString() })
   //    }
   // }

   dragInList(result, idList) {
      // if (!result.destination) return;
      // const { source, destination } = result;

      // if (source.droppableId !== destination.droppableId) {
      //    const sourceColumn = this.lists[source.droppableId];
      //    const destColumn = this.lists[destination.droppableId];
      //    const sourceTasks = [...sourceColumn.tasks];
      //    const destTasks = [...destColumn.tasks];
      //    const [removed] = sourceTasks.splice(source.index, 1);
      //    destTasks.splice(destination.index, 0, removed);
      //    setColumns({
      //       ...this.lists,
      //       [source.droppableId]: {
      //          ...sourceColumn,
      //          tasks: sourceTasks
      //       },
      //       [destination.droppableId]: {
      //          ...destColumn,
      //          tasks: destTasks
      //       }
      //    });
      // } else {
      //    const column = columns[source.droppableId];
      //    console.log(column);
      //    const copiedTasks = [...column.tasks];
      //    const [removed] = copiedTasks.splice(source.index, 1);
      //    copiedTasks.splice(destination.index, 0, removed);
      //    setColumns({
      //       ...columns,
      //       [source.droppableId]: {
      //          ...column,
      //          tasks: copiedTasks
      //       }
      //    });
      // }

      if (this.lists.length) {
         const list = this.lists.find((data) => data.id === idList);

         if (!result.destination) return;

         const [reorderedItem] = list.tasks.splice(result.source.index, 1);
         list.tasks.splice(result.destination.index, 0, reorderedItem);
      }

   }

   dragLists(result) {
      if (!result.destination) return;

      const [reorderedItem] = this.lists.splice(result.source.index, 1);
      this.lists.splice(result.destination.index, 0, reorderedItem);
   }
}


export default new BoardStore()