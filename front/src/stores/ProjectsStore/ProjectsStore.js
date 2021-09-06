import { action, makeObservable, observable, runInAction, toJS } from "mobx"
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
      });
      // this.loadProjects();
   }

   pushProject = async (title, content) => {
      try {
         const res = await axios.post(LINK_PROJECTS, { title, content })
         const project = toJS(res.data)
         // console.log(project);
         runInAction(() => {
            this.projects.push(project)
         })

      } catch (error) {
         runInAction(() => {
            toast.error("invalid data")
         })
      }
   }

   // loadProjects = async () => {
   //    const res = await axios.get("http://localhost:5000/projects")
   //    const project = res.data
   //    this.pushProject(res.data)
   // }

   // pushProject(title, content) {
   //    let foundId = 0
   //    if (this.projects) {

   //       for (let i = 0; i < this.projects.length; i++) {

   //          if (this.projects[i].id > foundId) {
   //             foundId = this.projects[i].id
   //          }
   //       }
   //       foundId++
   //       this.projects.unshift({ title, content, id: foundId.toString() })
   //    }
   // }


   dragProject(result) {
      if (!result.destination) return;

      const [reorderedItem] = this.projects.splice(result.source.index, 1);
      this.projects.splice(result.destination.index, 0, reorderedItem);
   }

}


export default new ProjectsStore()