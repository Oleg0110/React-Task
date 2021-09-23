import { action, makeObservable, observable } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_USER_AUTH_LOG_IN, LINK_USER_AUTH_PEOPLE, LINK_USER_AUTH_SING_UP, LINK_USER_AUTH_USER } from "../../utils/httpLinks";

class UserStore {
   users = []
   user = {}
   constructor() {
      makeObservable(this, {
         users: observable,
         user: observable,
         registerUser: action,
         loginUser: action,
         setUsers: action,
         setUser: action,
      })
      this.asyncGetUsers()
      this.asyncGetUser()
   }

   asyncGetUsers = async () => {
      try {
         const res = await axios.get(LINK_USER_AUTH_PEOPLE)
         const user = res.data
         this.setUsers(user)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   setUsers = (user) => {
      this.users = user
   }

   asyncGetUser = async () => {
      try {
         const id = localStorage.getItem("userData")
         const userJsonId = JSON.parse(id)
         const userId = userJsonId.userId

         const res = await axios.get(`${LINK_USER_AUTH_USER}/${userId}`)
         const userData = res.data

         this.setUser(userData)
      } catch (error) {
      }
   }

   setUser = (user) => {
      this.user = user
   }

   registerUser = async (email, name, password,) => {
      try {
         const res = await axios.post(LINK_USER_AUTH_SING_UP, { email, name, password })
         // const res = await axios.post(LINK_USER_SING_UP, { email, name, password })
         const user = res.data

         this.users.push(user)
         toast.success("Acount was Created")
      } catch (error) {
         toast.error("invalid data")
      }
   }

   loginUser = async (email, password, auth) => {
      try {
         const res = await axios.post(LINK_USER_AUTH_LOG_IN, { email, password })
         const user = res.data
         auth.login(user.token, user.userId)
         toast.success("Welcome")
      } catch (error) {
         toast.error("invalid data")
      }
   }

}

export default new UserStore()