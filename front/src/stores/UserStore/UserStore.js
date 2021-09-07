import { action, makeObservable, observable, runInAction, toJS } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';

class UserStore {
   user = []
   constructor() {
      makeObservable(this, {
         user: observable,
         pushUser: action
      })
   }

   pushUser(name, email, password) {
      try {
         //await
         const res = axios.post("http://localhost:5000/people", { name, email, password })
         const user = toJS(res.data)
         runInAction(() => {
            this.user.push(user)
            toast("Acount was Created")
         })
      } catch (error) {
         runInAction(() => {
            toast.error("invalid data")
         })
      }
   }



}

export default new UserStore