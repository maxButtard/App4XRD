import axios from "axios"

const API = axios.create({
  baseURL: "https://app4xrd.onrender.com"
})

export default API