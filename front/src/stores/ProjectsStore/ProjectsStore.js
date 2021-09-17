import { action, makeObservable, observable } from "mobx"
import axios from "axios"
import { toast } from 'react-toastify';
import { LINK_PROJECTS } from "../../utils/httpLinks"

class ProjectsStore {
   projects = []
   constructor() {
      makeObservable(this, {
         projects: observable,
         pushProject: action,
         dragProject: action,
         deletedProject: action,
         changedProjecTitle: action,
         changeProjecContent: action,
         asyncGetProjects: action,
      });
      // this.loadProjects();
   }

   asyncGetProjects = async () => {
      const res = await axios.get(LINK_PROJECTS)
      const projects = res.data
      this.projects = projects
   }


   pushProject = async (title, content) => {
      try {
         const res = await axios.post(LINK_PROJECTS, { title, content })
         const project = res.data

         this.projects.push(project)

      } catch (error) {
         toast.error("invalid data")
      }
   }

   changedProjecTitle = async (title, id) => {
      try {
         const res = await axios.patch(`${LINK_PROJECTS}${"/title"}`, { title, id })
         const changedProjectTitle = res.data

         const foundProjectIndex = this.projects.findIndex(found => found._id === id)

         this.projects.splice(foundProjectIndex, 1, changedProjectTitle)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   changeProjecContent = async (content, id) => {
      try {
         const res = await axios.patch(`${LINK_PROJECTS}${"/content"}`, { content, id })
         const changedProjectContent = res.data

         const foundProjectIndex = this.projects.findIndex(found => found._id === id)

         this.projects.splice(foundProjectIndex, 1, changedProjectContent)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   deletedProject = async (id) => {
      try {
         const res = await axios.delete(`${LINK_PROJECTS}/${id}`)
         const deletedProject = res.data

         const foundProjectIndex = this.projects.findIndex(found => found._id === id)

         this.projects.splice(foundProjectIndex, 1)
      } catch (error) {
         toast.error("invalid data")
      }
   }


   dragProject = async (result) => {

      try {
         const res = await axios.patch(`${LINK_PROJECTS}${"/position"}`, { result })
         const changedProjectPosition = res.data

         this.projects = changedProjectPosition
      } catch (error) {
         toast.error("invalid data")
      }
   }

}


export default new ProjectsStore()