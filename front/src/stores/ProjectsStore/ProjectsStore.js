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
         deleteProject: action,
         changeProjecTitle: action,
         changeProjecContent: action,
         setProjects: action,
      });
      // this.loadProjects();
   }

   setProjects = async () => {
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

   changeProjecTitle = async (title, id) => {
      const res = await axios.patch(LINK_PROJECTS, { title, id })
      const changedTitle = res.data
      this.projects = changedTitle
   }

   deleteProject = async (id) => {

      try {
         const res = await axios.delete(LINK_PROJECTS, { id })
         const deleteProject = res.data
         this.projects = deleteProject
      } catch (error) {
         toast.error("invalid data")
      }
   }



   changeProjecContent = async (content) => {

   }

   dragProject(result) {
      if (!result.destination) return;

      const [reorderedItem] = this.projects.splice(result.source.index, 1);
      this.projects.splice(result.destination.index, 0, reorderedItem);
   }

}


export default new ProjectsStore()