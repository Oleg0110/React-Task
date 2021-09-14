import { action, makeObservable, observable } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_USER_SING_UP } from "../../utils/httpLinks";

class UserStore {
   user = []
   constructor() {
      makeObservable(this, {
         user: observable,
         pushUser: action
      })
      this.asyncGetUser()
   }

   asyncGetUser = async () => {
      const res = await axios.get(LINK_USER_SING_UP)
      const user = res.data
      this.user = user
   }

   pushUser = async (email, name, password) => {
      try {
         const res = await axios.post(LINK_USER_SING_UP, { email, name, password })
         const user = res.data
         this.user.push(user)
         toast.success("Acount was Created")
      } catch (error) {
         toast.error("invalid data")
      }
   }



}

export default new UserStore()