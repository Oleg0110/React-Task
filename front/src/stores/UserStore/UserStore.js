import axios from "axios";
import { action, makeObservable, observable } from "mobx"
import { toast } from "react-toastify";
import { getUser, getUsers, login, register } from "../../services/user";
import { LINK_USER_AUTH_PEOPLE, LINK_USER_AUTH_USER } from "../../utils/httpLinks";

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
         asyncGetUsers: action,
         asyncGetUser: action
      })
      // this.asyncGetUsers()
      this.asyncGetUser()
   }

   asyncGetUsers = async (number, usersOnPage) => {
      // const user = await getUsers()
      // this.setUsers(user)
      try {
         const res = await axios.get(`http://localhost:5000/user-auth/people?page=${number}&count=${usersOnPage}`)
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
      // const user = await getUser()
      // this.setUser(user)
      try {
         const id = localStorage.getItem("userData")
         const userJsonId = JSON.parse(id)
         const userId = userJsonId.userId

         const res = await axios.get(`${LINK_USER_AUTH_USER}/${userId}`)

         const user = res.data

         this.setUser(user)
      } catch (error) {
         toast.error("dddddddddd")
      }
   }

   setUser = (user) => {
      this.user = user
   }

   registerUser = async (email, name, password) => {
      const reg = await register(email, name, password)
      // this.user = reg
   }

   loginUser = async (email, password, auth) => {
      await login(email, password, auth)
   }

   // loginUser = async (email, password, auth) => {
   //    try {
   //       const res = await axios.post(LINK_USER_AUTH_LOG_IN, { email, password })
   //       const user = res.data
   //       auth.login(user.token, user.userId)
   //       toast.success("Welcome")
   //       // window.location.reload()
   //    } catch (error) {
   //       toast.error("invalid data")
   //    }
   // }

}

export default new UserStore()