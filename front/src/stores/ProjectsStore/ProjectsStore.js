import { action, makeObservable, observable } from "mobx"

class ProjectsStore {
   projects = [{ id: 1, title: "Vova's Project", content: "I hope that this project will be the best project of all and the best in her life" },
   { id: 2, title: "Mega Project", content: "Da diydiy tu kanieshno sharush bagato chogo fovodfhvdfoijdfoibniffbvhufduiv udfhuhvdfhuh sudfhvudfhu sdfbbfjbn sfhhbujdfnfhbijn " },
   { id: 3, title: "React", content: "React first project. pjgvdfjgiojdfiogjbiodfbiojdfgiobjfgiobiofgnboifnodjgiobfgbio" },
   { id: 4, title: "App", content: "My app react project. Da diydiy tu kanieshno sharush bagato chogo fovodfhvdfoijdfoibniffbvhufduiv udfhuhvdfhuh sudfhvudfhu sdfbbfjbn sfhhbujdfnfhbijn " },
   { id: 5, title: "People in My city", content: "Here is all people who lives in my city. I hope that this project will be the best project of all and the best in her life" },
   { id: 6, title: "New page", content: "I don't know what is it!!! Da diydiy tu kanieshno sharush bagato chogo fovodfhvdfoijdfoibniffbvhufduiv udfhuhvdfhuh sudfhvudfhu sdfbbfjbn sfhhbujdfnfhbijn " },]
   constructor() {
      makeObservable(this, {
         projects: observable,
         pushProject: action,
      })
   }

   pushProject(title, content) {
      this.projects.push({ title, content })
      console.log(this.projects.length);
   }

}


export default new ProjectsStore()