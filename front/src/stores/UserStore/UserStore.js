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

   pushName() {
      this.name.push()
   }

   pushEmail() {
      this.email.push()
   }


}

export default new UserStore