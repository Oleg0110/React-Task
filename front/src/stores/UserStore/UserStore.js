import { action, makeObservable, observable } from "mobx"

class UserStore {
   name = ""
   email = ""
   constructor() {
      makeObservable(this, {
         name: observable,
         email: observable,
         pushName: action
      })
   }

   pushName(value) {
      this.name = value
   }

   pushEmail() {

   }


}

export default new UserStore