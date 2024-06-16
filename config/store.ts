import userSlice from "@/reducer/userSlice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
    // middleware: (getDefaultMiddleware) => {
    //     getDefaultMiddleware({
    //         serializableCheck: false
    //     })
    // }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>