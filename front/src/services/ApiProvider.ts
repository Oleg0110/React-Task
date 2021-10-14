import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { UserStore } from "stores";
import { BASIC_URL } from "utils/httpLinks";


class ApiProvider {

   private axiosWrapper: AxiosInstance
   constructor() {
      this.axiosWrapper = axios.create({ baseURL: BASIC_URL })
   }

   doFetch = async (requestType: "put" | "get" | "patch" | "post" | "delete" = "get", url: string, body?: object) => {
      try {
         if (requestType === "get" || requestType === "delete") {
            return await this.axiosWrapper[requestType](url, { headers: { Authorization: `Bearer ${UserStore.userToken}` } })

         }
         return await this.axiosWrapper[requestType](url, body, { headers: { Authorization: `Bearer ${UserStore.userToken}` } })

      } catch (error) {
         toast.error("invalid data")

      }
   }
}

const api = new ApiProvider()

export default api