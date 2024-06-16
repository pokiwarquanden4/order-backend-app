import { sendRequest } from "@/config/axiosConfig"
import { IMenu } from "@/constants/types/MenuTypes"


export interface ILogin {
    account: string,
    password: string,
}


export const login = async (login: ILogin) => {
    const res = await sendRequest(`staff/login`, {
        payload: login,
        method: "POST"
    })
    return res
}