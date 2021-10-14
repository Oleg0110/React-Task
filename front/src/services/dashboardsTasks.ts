import { LINK_DASHBOARD_TASKS } from "../utils/httpLinks"
import api from "./ApiProvider"


export const getTasks = async (columnId: string) => {

   const res = await api.doFetch("get", `${LINK_DASHBOARD_TASKS}/${columnId}`)

   return res?.data
}

export const taskPush = async (text: string, id: string, projectId: string) => {

   const res = await api.doFetch("post", LINK_DASHBOARD_TASKS, { text, id, projectId })

   return res?.data
}

export const taskChanged = async (text: string, id: string) => {

   const res = await api.doFetch("patch", LINK_DASHBOARD_TASKS, { text, id })

   return res?.data
}

export const taskDelete = async (id: string) => {

   await api.doFetch("delete", `${LINK_DASHBOARD_TASKS}/${id}`)
}