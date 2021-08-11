import { action, makeObservable, observable } from "mobx"

class BoardStore {
   lists = [{ id: 1, title: "To Do", tasks: [{ id: 1, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" }] },
   { id: 2, title: "Done" }]

   constructor() {
      makeObservable(this, {
         lists: observable,
         pushList: action,
         pushTask: action
      })
   }



   pushList(title) {
      this.lists.push({ title })
      console.log(title);
   }

   pushTask(tasks) {
      this.lists.push({ tasks })
   }
}


export default new BoardStore()