import axios from "axios";
import { action, makeObservable, observable, toJS } from "mobx"
import { toast } from "react-toastify";
import { getUser, getUsers, login, register } from "../../services/user";
import { storageDataName } from "../../utils/constants";
import { LINK_USER_AUTH_PEOPLE, LINK_USER_AUTH_USER } from "../../utils/httpLinks";

class UserStore {
   users = []
   user = {}
   userId = ""
   userToken = ""
   constructor() {
      makeObservable(this, {
         users: observable,
         user: observable,
         userId: observable,
         userToken: observable,
         registerUser: action,
         loginUser: action,
         setUsers: action,
         setUser: action,
         asyncGetUsers: action,
         asyncGetUser: action,
         getUserId: action,
         setUserId: action,
         getUserToken: action,
         setUserToken: action
      })
      this.getUserToken()
      this.getUserId()
      this.asyncGetUser()
   }

   getUserId = () => {
      const userId = localStorage.getItem(storageDataName)

      if (userId) {
         const userJson = JSON.parse(userId)

         this.setUserId(userJson.userId)
      }
   }

   setUserId = (id) => {
      this.userId = id
   }

   getUserToken = () => {
      const userToken = localStorage.getItem(storageDataName)

      if (userToken) {
         const userJson = JSON.parse(userToken)
         const token = userJson.token

         this.setUserToken(token)
      }
   }

   setUserToken = (token) => {
      this.userToken = token
   }

   asyncGetUsers = async (number, usersOnPage) => {
      // const user = await getUsers()
      // this.setUsers(user)
      try {
         const res = await axios.get(`http://localhost:5000/user-auth/people?page=${number}&count=${usersOnPage}`)
         const users = res.data

         this.setUsers(users)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   setUsers = (user) => {
      this.users = user
      console.log(this.users);
   }

   asyncGetUser = async () => {
      await this.getUserToken()
      await this.getUserId()

      if (this.userId) {
         const user = await getUser(this.userId)
         this.setUser(user)
      }

      // try {

      //    await this.getUserToken()
      //    await this.getUserId()
      //    if (this.userId) {
      //       const res = await axios.get(`${LINK_USER_AUTH_USER}/${this.userId}`)

      //       const user = res.data

      //       this.setUser(user)
      //    }
      // } catch (error) {
      //    toast.error("dddddddddd")
      // }
   }

   setUser = (user) => {
      this.user = user
   }

   registerUser = async (email, name, password) => {
      await register(email, name, password)
      await this.asyncGetUser()
   }

   loginUser = async (data) => {
      const { email, password } = data
      await login(email, password)
      await this.asyncGetUser()
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