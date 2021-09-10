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

   setUser = async () => {
      const res = await axios.get("http://localhost:5000/user/sign-up")
      const user = res.data
      this.user = user
   }

   pushUser = async (email, name, password) => {
      try {
         const res = await axios.post("http://localhost:5000/user/sign-up", { email, name, password })
         const user = res.data
         this.user.push(user)
         toast.success("Acount was Created")
      } catch (error) {
         toast.error("invalid data")
      }
   }



}

export default new UserStore()