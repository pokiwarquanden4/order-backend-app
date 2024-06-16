import { Redirect } from "expo-router";
import axios from 'axios';

export default function Index() {
  //Set backend URL
  axios.defaults.baseURL = 'http://10.0.2.2:5000/'
  //Set default timeout
  axios.defaults.timeout = 30000
  console.log('in')

  return (
    <Redirect href={'/home'}></Redirect>
  )
}
