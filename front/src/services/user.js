import { toJS } from "mobx"
import { toast } from "react-toastify"
import { storageDataName } from "../utils/constants"
import { LINK_USER_AUTH_LOG_IN, LINK_USER_AUTH_PEOPLE, LINK_USER_AUTH_SING_UP, LINK_USER_AUTH_USER } from "../utils/httpLinks"
import axiosWrraper from "./axiosWrapper"

export const getUsers = async () => {
   try {
      const res = await axiosWrraper.get(LINK_USER_AUTH_PEOPLE)

      return res.data
   } catch (error) {
      toast.error("invalid data")
   }
}

export const getUser = async (userId) => {
   try {
      const res = await axiosWrraper.get(`${LINK_USER_AUTH_USER}/${userId}`)
      console.log(toJS(res.data));
      return res.data

   } catch (error) {
      toast.error("dddddddddd")
   }
}

export const register = async (email, name, password) => {
   try {
      const res = await axiosWrraper.post(LINK_USER_AUTH_SING_UP, { email, name, password })
      const { token, currentUser } = res.data

      localStorage.setItem(storageDataName, JSON.stringify({
         userId: currentUser._id, token: token
      }))

      toast.success("Acount was Created")

      return currentUser

   } catch (error) {
      toast.error("invalid data")
   }
}

export const login = async (email, password) => {
   try {
      const res = await axiosWrraper.post(LINK_USER_AUTH_LOG_IN, { email, password })
      const user = res.data

      localStorage.setItem(storageDataName, JSON.stringify({
         userId: user.userId, token: user.token
      }))

      toast.success("Welcome")

   } catch (error) {
      toast.error("invalid data")
   }
}

export const token = (token) => {
   const userToken = token
   console.log(userToken);
   return userToken
}