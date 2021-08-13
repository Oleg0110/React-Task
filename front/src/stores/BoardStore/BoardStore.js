import { action, makeObservable, observable } from "mobx"

class BoardStore {
   lists = [
      {
         id: 1, title: "To Do",
         tasks: [
            { id: 1, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: 2, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: 3, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: 4, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: 5, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" },
            { id: 6, text: "I have to something", priority: "medium", taskState: "done", label: "SPACE TRAVEL PARTNERS" }]
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
      this.lists.push({ title })
      console.log(title);
   }

   pushTask(text) {
      this.lists.push({ text })
   }
}


export default new BoardStore()