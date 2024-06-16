import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    account: string,
    role: string,
    phoneNumber: string,
    name: string,
    email: string,
    address: string,
    gender: boolean,
    _id: string,
}

const initialState: IUser = {
    account: '',
    role: '',
    phoneNumber: '',
    name: '',
    email: '',
    address: '',
    gender: true,
    _id: '',
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const data = action.payload
            state.account = data.account
            state.role = data.role
            state.phoneNumber = data.phoneNumber
            state.name = data.name
            state.email = data.email
            state.address = data.address
            state.gender = data.gender
            state._id = data._id
        },
    },
    extraReducers: (builder) => {

    }
})

export const { setUser } = UserSlice.actions
export default UserSlice.reducer