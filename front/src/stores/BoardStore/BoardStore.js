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



   pushList(title, id) {
      console.log(this.lists.push({ title, id }));
   }

   pushTask(text, id) {
      this.lists.push({ text, id });
      const foundLists = this.lists.find((data) => data.id === id)
      console.log(foundLists);
   }
}


export default new BoardStore()