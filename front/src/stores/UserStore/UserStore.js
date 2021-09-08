import { action, makeObservable, observable } from "mobx"
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

   pushUser = async (email, name, password) => {
      try {
         const res = await axios.post("http://localhost:5000/sign-up", { email, name, password })
         const user = res.data
         console.log(9, user);
         this.user.push(user)
         toast.success("Acount was Created")
      } catch (error) {
         toast.error("invalid data")
      }
   }



}

export default new UserStore()