import axios from "axios";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import { UserStore } from "../stores";
import { BASIC_URL } from "../utils/httpLinks";

// class Wrapper {

//    constructor() {
//       this.userToken = ""
//       console.log(this.userToken);
//    }

//    doFatch = () => {
//       const token = UserStore.userToken
//       this.userToken = token
//       console.log(this.userToken);
//    }

// }

// const token = new Wrapper(UserStore)

// console.log(token);
// !!! ToDo Token 

const Wrapper = class UserStore {
   constructor(userToken) {
      this.userToken = userToken
   }
   getToken() {
      return this.userToken
   }
}

let tok = new Wrapper()

// console.log(tok.getToken());


const getToken = () => {
   const token = localStorage.getItem("userData")
   if (token) {
      const userJsonId = JSON.parse(token)
      const userToken = userJsonId.token
      return userToken
   }
}

const axiosWrraper = axios.create({ baseURL: BASIC_URL, headers: { Authorization: `Bearer ${getToken()}` } });

export default observer(axiosWrraper)
