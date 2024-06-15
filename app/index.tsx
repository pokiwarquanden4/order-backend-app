import { Redirect } from "expo-router";
import axios from 'axios';
import { handleAxiosRequest, handleAxiosResponse } from "@/config/axiosConfig";

export default function Index() {
  //Set backend URL
  axios.defaults.baseURL = 'http://10.0.2.2:5000/'
  //Set default timeout
  axios.defaults.timeout = 30000
  //Inject token for authorization
  axios.interceptors.request.use(
    handleAxiosRequest,
    error => Promise.reject(error)
  )
  //Handle Axios Response
  axios.interceptors.response.use(
    handleAxiosResponse,
    error => Promise.reject(error)
  )

  return <Redirect href={'/home'}></Redirect>
}
