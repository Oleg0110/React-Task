import { toast } from "react-toastify"
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

export const getUser = async () => {
   try {
      const id = localStorage.getItem("userData")
      const userJsonId = JSON.parse(id)
      const userId = userJsonId.userId

      const res = await axiosWrraper.get(`${LINK_USER_AUTH_USER}/${userId}`)
      return res.data

   } catch (error) {
      toast.error("dddddddddd")
   }
}

export const register = async (email, name, password) => {
   try {
      const res = await axiosWrraper.post(LINK_USER_AUTH_SING_UP, { email, name, password })
      const reg = res.data

      toast.success("Acount was Created")
      return reg

   } catch (error) {
      toast.error("invalid data")
   }
}

export const login = async (email, password, auth) => {
   try {
      const res = await axiosWrraper.post(LINK_USER_AUTH_LOG_IN, { email, password })
      const user = res.data
      auth.login(user.token, user.userId)
      toast.success("Welcome")

   } catch (error) {
      toast.error("invalid data")
   }
}