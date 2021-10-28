import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { UserStore } from '../stores'
import { BASIC_URL } from '../utils/httpLinks'

class ApiProvider {
  private axiosWrapper: AxiosInstance

  constructor() {
    this.axiosWrapper = axios.create({ baseURL: BASIC_URL })
  }

  doFetch = async (
    requestType: 'put' | 'get' | 'patch' | 'post' | 'delete' = 'get',
    url: string,
    body?: object,
  ) => {
    try {
      if (requestType === 'get' || requestType === 'delete') {
        const twoTypes = await this.axiosWrapper[requestType](url, {
          headers: { Authorization: `Bearer ${UserStore.userToken}` },
        })
        return twoTypes
      }
      const anotherType = await this.axiosWrapper[requestType](url, body, {
        headers: { Authorization: `Bearer ${UserStore.userToken}` },
      })
      return anotherType
    } catch (error) {
      toast.error('invalid data')
      throw error
    }
  }
}

const api = new ApiProvider()

export default api
