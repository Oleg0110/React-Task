import { action, makeObservable, observable, runInAction, toJS } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_DASHBOARD_LIST, LINK_DASHBOARD_TASK } from "../../utils/httpLinks";

class BoardStore {
   lists = [
      { id: "0", title: "Done", tasks: [{ id: "0", text: "I have to something" }] }]

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
         const list = toJS(res.data)
         console.log(2, list);
         runInAction(() => {
            this.lists.push(list)
         })

      } catch (error) {
         runInAction(() => {
            toast.error("invalid data")
         })
      }
   }

   pushTask = async (text, id) => {
      try {
         const res = await axios.post(LINK_DASHBOARD_TASK, { text, id })
         const task = toJS(res.data)
         console.log('task:', task);
         runInAction(() => {
            this.lists[id].tasks.push(task);
         })
      } catch (error) {
         runInAction(() => {
            toast.error("invalid data")
         })
      }
      // const foundLists = this.lists.find((data) => data.id === id)
      // console.log(2, foundLists);
      // let foundId = 0
      // if (foundLists.tasks) {

      //    for (let i = 0; i < foundLists.tasks.length; i++) {
      //       console.log(foundLists.tasks.length);
      //       if (foundLists.tasks[i].id > foundId) {
      //          foundId = foundLists.tasks[i].id
      //       }
      //    }
      //    foundId++
      //    foundLists.tasks.push({ text, id: foundId.toString() })
      // }
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