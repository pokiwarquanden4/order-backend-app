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
    const res = await sendRequest(`dish/createMenu`, {
        payload: menu,
        method: "POST"
    })
    return res
}

export const getMenu = async () => {
    const res = await sendRequest(`dish/getMenu`, {
        payload: {},
        method: "GET"
    })
    return res
}

export const editMenu = async (menu: IMenu) => {
    const res = await sendRequest(`dish/editMenu`, {
        payload: menu,
        method: "POST"
    })
    return res
}

export const deleteMenu = async (_id: string) => {
    const res = await sendRequest(`dish/deleteMenu`, {
        payload: {
            _id: _id
        },
        method: "POST"
    })
    return res
}

export const getDishes = async (_id: string) => {
    const res = await sendRequest(`dish/getDish?_id=${_id}`, {
        payload: {},
        method: "GET"
    })
    return res
}