import { toast } from "react-toastify"
import { LINK_DASHBOARD_LISTS } from "../utils/httpLinks"
import axiosWrraper from "./axiosWrapper"


export const getLists = async (projectId) => {
   try {
      const res = await axiosWrraper.get(`${LINK_DASHBOARD_LISTS}/${projectId}`)
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const push = async (title, projectId) => {
   try {
      const res = await axiosWrraper.post(LINK_DASHBOARD_LISTS, { title, projectId })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const change = async (title, id) => {
   try {
      const res = await axiosWrraper.patch(LINK_DASHBOARD_LISTS, { title, id })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const deleted = async (id) => {
   try {
      await axiosWrraper.delete(`${LINK_DASHBOARD_LISTS}/${id}`)

   } catch (error) {
      toast.error("invalid data")
   }
}
