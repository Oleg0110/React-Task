
interface IurlValue {
   page: string | number,
   count: string | number
}

export const urlValue = (string: string): IurlValue => {

   const urlValue = {
      page: "",
      count: ""
   }

   if (string) {

      const page = string.split("?")[1].split("&")[0].split("=")[1]
      urlValue.page = page

      const count = string.split("?")[1].split("&")[1].split("=")[1]
      urlValue.count = count

   }

   return urlValue

}
