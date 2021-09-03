import { action, makeObservable, observable } from "mobx"
import axios from "axios"

class ProjectsStore {
   projects = [{ id: "1", title: "Vova's Project", content: "I hope that this project will be the best project of all and the best in her life" },
   { id: "2", title: "Mega Project", content: "Da diydiy tu kanieshno sharush bagato chogo fovodfhvdfoijdfoibniffbvhufduiv udfhuhvdfhuh sudfhvudfhu sdfbbfjbn sfhhbujdfnfhbijn " },
   { id: "3", title: "React", content: "React first project. pjgvdfjgiojdfiogjbiodfbiojdfgiobjfgiobiofgnboifnodjgiobfgbio" },
   { id: "4", title: "App", content: "My app react project. Da diydiy tu kanieshno sharush bagato chogo fovodfhvdfoijdfoibniffbvhufduiv udfhuhvdfhuh sudfhvudfhu sdfbbfjbn sfhhbujdfnfhbijn " },
   { id: "5", title: "People in My city", content: "Here is all people who lives in my city. I hope that this project will be the best project of all and the best in her life" },
   { id: "6", title: "New page", content: "I don't know what is it!!! Da diydiy tu kanieshno sharush bagato chogo fovodfhvdfoijdfoibniffbvhufduiv udfhuhvdfhuh sudfhvudfhu sdfbbfjbn sfhhbujdfnfhbijn " },]
   constructor() {
      makeObservable(this, {
         projects: observable,
         pushProject: action,
         dragProject: action,
      });
      this.loadProjects();
   }

   loadProjects = async () => {
      const res = await axios.get("http://localhost:5000/projects")
      console.log(res);
      // this.pushProject(res.data)
   }

   pushProject(title, content) {
      let foundId = 0
      if (this.projects) {

         for (let i = 0; i < this.projects.length; i++) {

            if (this.projects[i].id > foundId) {
               foundId = this.projects[i].id
            }
         }
         foundId++
         this.projects.unshift({ title, content, id: foundId.toString() })
      }
   }


   dragProject(result) {
      if (!result.destination) return;

      const [reorderedItem] = this.projects.splice(result.source.index, 1);
      this.projects.splice(result.destination.index, 0, reorderedItem);
   }

}


export default new ProjectsStore()