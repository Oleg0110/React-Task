import { action, makeObservable } from "mobx"
import { observer } from "mobx-react"

class CreateListStore {
   list = []
   constructor() {
      makeObservable(this, {
         list: observer,
         pushList: action
      })
   }

   pushList() {
      this.list.push()
   }
}


export default new CreateListStore()