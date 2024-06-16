import { sendRequest } from "@/config/axiosConfig"
import { IIngredient } from "@/constants/types/MenuTypes"

export const createIngre = async (ingre: IIngredient) => {
    const res = await sendRequest(`dish/createMenu`, {
        payload: ingre,
        method: "POST"
    })
    return res
}

export const getIngre = async () => {
    const res = await sendRequest(`dish/getAllIngre`, {
        payload: {},
        method: "GET"
    })
    return res
}

export const deleteIngre = async (_id: string) => {
    const res = await sendRequest(`dish/deleteIngre`, {
        payload: {
            _id: _id
        },
        method: "POST"
    })
    return res
}

export const editIngre = async (ingre: IIngredient) => {
    const res = await sendRequest(`dish/updateIngre`, {
        payload: ingre,
        method: "POST"
    })
    return res
}