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
      });
      // this.loadProjects();
   }

   pushProject = async (title, content) => {
      try {
         const res = await axios.post(LINK_PROJECTS, { title, content })
         const project = res.data
         // console.log(project);
         this.projects.push(project)

      } catch (error) {
         toast.error("invalid data")
      }
   }

   deleteProject = async (id) => {

      try {
         console.log("tyt");
         const res = await axios.delete(LINK_PROJECTS, { id })
         const deleteProject = res.data
         console.log(deleteProject);
         this.projects.splice(deleteProject, 1)

      } catch (error) {
         toast.error("invalid data")
      }
   }

   changeProjecTitle = async (content, id) => {
      const res = await axios.patch(LINK_PROJECTS, { content, id })
      const changedTitle = res.data
      console.log(changedTitle);
      this.projects.push(changedTitle)
   }

   changeProjecContent = async (content) => {

   }

   // loadProjects = async () => {
   //    const res = await axios.get("http://localhost:5000/projects")
   //    const project = res.data
   //    this.pushProject(res.data)
   // }


   dragProject(result) {
      if (!result.destination) return;

      const [reorderedItem] = this.projects.splice(result.source.index, 1);
      this.projects.splice(result.destination.index, 0, reorderedItem);
   }

}


export default new ProjectsStore()