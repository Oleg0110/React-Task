import { action, makeObservable, observable } from "mobx"
import axios from "axios"

class BoardStore {
   lists = [
      {
         id: "0", title: "To Do",
         tasks: [
            { id: "1", text: "000000000000000000", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: "2", text: "111111111111111111", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: "3", text: "222222222222222222", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: "4", text: "333333333333333333", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: "5", text: "444444444444444444", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" }]
      },
      { id: "1", title: "Done", tasks: [{ id: "6", text: "I have to something" }] }]

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         pushTask: action,
         dragLists: action,
         dragInList: action,
      })
      this.loadProjects()
   }

   loadProjects = async () => {
      const res = await axios.get("http://localhost:5000/dashboards")
      console.log(res);
   }

   pushList(title) {
      let foundId = 0
      if (this.lists) {


         for (let i = 0; i < this.lists.length; i++) {

            if (this.lists[i].id > foundId) {
               foundId = this.lists[i].id
            }
         }
         foundId++
         this.lists.push({ title, id: foundId.toString(), tasks: [] });
      }

   }

   pushTask(text, id) {
      const foundLists = this.lists.find((data) => data.id === id)

      let foundId = 0
      if (foundLists.tasks) {

         for (let i = 0; i < foundLists.tasks.length; i++) {
            console.log(foundLists.tasks.length);
            if (foundLists.tasks[i].id > foundId) {
               foundId = foundLists.tasks[i].id
            }
         }
         foundId++
         foundLists.tasks.push({ text, id: foundId.toString() })
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

      const [reorderedItem] = this.lists.splice(result.source.index, 1);
      this.lists.splice(result.destination.index, 0, reorderedItem);
   }
}


export default new BoardStore()