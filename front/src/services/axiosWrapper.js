import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASIC_URL } from "../utils/httpLinks";


// const token = localStorage.getItem("userData")
// const userJsonId = JSON.parse(token)
// const userToken = userJsonId.token

// const auth = useContext(AuthContext)
// console.log(auth.token);

const axiosWrraper = axios.create({ baseURL: BASIC_URL, headers: { Authorization: `Bearer ` } });

export default axiosWrraper