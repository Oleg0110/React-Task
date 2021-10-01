import axios from "axios"
import { toast } from "react-toastify"
import { LINK_PROJECTS } from "../utils/httpLinks"
import axiosWrraper from "./axiosWrapper"

export const getProjects = async () => {
   try {
      const id = localStorage.getItem("userData")
      const userJsonId = JSON.parse(id)
      const userId = userJsonId.userId

      const res = await axiosWrraper.get(`${LINK_PROJECTS}/${userId}`)
      const project = res.data
      return project
   } catch (error) {
      toast.error("invalid data")
   }
}

export const push = async (title, content) => {
   try {
      const id = localStorage.getItem("userData")
      const user = JSON.parse(id)
      const userId = user.userId

      const res = await axiosWrraper.post(LINK_PROJECTS, { title, content, userId })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const changedTitle = async (title, id) => {
   try {
      const res = await axiosWrraper.patch(`${LINK_PROJECTS}${"/title"}`, { title, id })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const changedContent = async (content, id) => {
   try {
      const res = await axiosWrraper.patch(`${LINK_PROJECTS}${"/content"}`, { content, id })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}

export const deleted = async (id) => {
   try {
      await axiosWrraper.delete(`${LINK_PROJECTS}/${id}`)

   } catch (error) {
      toast.error("invalid data")
   }
}

export const drag = async (result) => {

   try {
      const res = await axiosWrraper.patch(`${LINK_PROJECTS}${"/position"}`, { result })
      return res.data

   } catch (error) {
      toast.error("invalid data")
   }
}