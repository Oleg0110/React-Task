import { action, makeObservable, observable } from "mobx"

class BoardStore {
   lists = [
      {
         id: 1, title: "To Do",
         tasks: [
            { id: 1, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: 2, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" }]
      },
      { id: 2, title: "Done", tasks: [{ id: 1, text: "I have to something" }] }]

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         pushTask: action
      })
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
         this.lists.push({ title, id: foundId, tasks: [] });
      }

   }

   pushTask(text, id) {
      const foundLists = this.lists.find((data) => data.id === id)
      let foundId = 0
      if (foundLists.tasks) {

         for (let i = 0; i < foundLists.tasks.length; i++) {

            if (foundLists.tasks[i].id > foundId) {
               foundId = foundLists.tasks[i].id
            }
         }
         foundId++
         foundLists.tasks.push({ text, id: foundId })
      }
      console.log(foundLists);
   }
}


export default new BoardStore()