import { sendRequest } from "@/config/axiosConfig"
import { IMenu } from "@/constants/types/MenuTypes"


export interface ICreateAccount {
    account: string,
    password: string,
    phoneNumber?: string
    name: string
    avatar?: File,
    address?: string
    email: string
    gender: boolean,
    role: string
}


export const createMenu = async (menu: IMenu) => {
    const res = await sendRequest(`dish/create/menu`, {
        payload: menu,
        method: "POST"
    })
    return res
}