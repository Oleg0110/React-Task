import axios from "axios";
import { action, makeObservable, observable } from "mobx"
import { toast } from "react-toastify";
import { changedContent, changedTitle, deleted, drag, getProjects, push } from "../../services/projects";
import { LINK_PROJECTS } from "../../utils/httpLinks";

class ProjectsStore {
   projects = []
   constructor() {
      makeObservable(this, {
         projects: observable,
         pushProject: action,
         dragProject: action,
         deletedProject: action,
         changedProjecTitle: action,
         changedProjecContent: action,
         asyncGetProjects: action,
         setProjects: action,
         setDragProject: action,
      });
   }

   asyncGetProjects = async () => {
      // const projects = await getProjects()
      // console.log(projects);
      // this.setProjects(projects)
      try {
         const id = localStorage.getItem("userData")
         const userJsonId = JSON.parse(id)
         const userId = userJsonId.userId

         const res = await axios.get(`${LINK_PROJECTS}/${userId}`)
         const projects = res.data
         this.setProjects(projects)
      } catch (error) {
         toast.error("invalid data")
      }
   }

   setProjects = (projects) => {
      this.projects = projects
   }


   pushProject = async (title, content) => {
      const project = await push(title, content)
      this.projects.push(project)
   }

   changedProjecTitle = async (title, id) => {

      const changedProjectTitle = await changedTitle(title, id)
      const foundProjectIndex = this.projects.findIndex(found => found._id === id)

      this.projects.splice(foundProjectIndex, 1, changedProjectTitle)
   }

   changedProjecContent = async (content, id) => {

      const changedProjectContent = await changedContent(content, id)
      const foundProjectIndex = this.projects.findIndex(found => found._id === id)

      this.projects.splice(foundProjectIndex, 1, changedProjectContent)
   }

   deletedProject = async (id) => {

      await deleted(id)
      const foundProjectIndex = this.projects.findIndex(found => found._id === id)

      this.projects.splice(foundProjectIndex, 1)
   }


   dragProject = async (result) => {

      const changedProjectPosition = await drag(result)

      this.setDragProject(changedProjectPosition)
   }

   setDragProject = (drag) => {
      this.projects = drag
   }

}


export default new ProjectsStore()