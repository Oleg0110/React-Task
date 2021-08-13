import { action, makeObservable } from "mobx"
import { observer } from "mobx-react"

class UserStore {
   name = ""
   email = ""
   constructor() {
      makeObservable(this, {
         name: observer,
         email: observer,
         pushName: action
      })
   }

   pushName() {
      this.name.push()
   }

   pushEmail() {
      this.email.push()
   }


}

export default new UserStore