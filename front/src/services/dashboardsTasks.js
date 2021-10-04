import { toast } from "react-toastify"
import { LINK_DASHBOARD_TASKS } from "../utils/httpLinks"
import axiosWrraper from "./axiosWrapper"


export const getTasks = async (listId) => {
   try {
      const res = await axiosWrraper.get(`${LINK_DASHBOARD_TASKS}/${listId}`)
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const taskPush = async (text, id, projectId) => {
   try {
      const res = await axiosWrraper.post(LINK_DASHBOARD_TASKS, { text, id, projectId })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const taskChanged = async (text, id) => {
   try {
      const res = await axiosWrraper.patch(LINK_DASHBOARD_TASKS, { text, id })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const taskDelete = async (id) => {
   try {
      await axiosWrraper.delete(`${LINK_DASHBOARD_TASKS}/${id}`)

   } catch (error) {
      toast.error("invalid data")
   }
}