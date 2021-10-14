
interface urlValue {
   page?: string | number,
   count?: string | number,
   projectId?: string
}


export const urlValue = (string: string) => {

   const urlValue = {
      page: "",
      count: "",
      projectId: ""
   }

   if (string.includes("?")) {

      const page = string.split("?")[1].split("&")[0].split("=")[1]
      urlValue.page = page

      const count = string.split("?")[1].split("&")[1].split("=")[1]
      urlValue.count = count

      return urlValue
   }
   else {
      const projectId = string.split("dashboards/")[1]
      urlValue.projectId = projectId

      return urlValue
   }

}
