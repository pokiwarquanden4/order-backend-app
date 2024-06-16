import { Loading } from "@/components/loading/Loading";
import LoginComponent from "@/components/Login/LoginComponent";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { store } from "@/config/store";
import { getToken } from "@/config/axiosConfig";

export default function RootLayout() {
  const [login, setLogin] = useState<boolean>(true)

  useEffect(() => {
    const async = async () => {
      const token = await getToken()

      if (token) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    }

    const intervalId = setInterval(async, 1000)

    return () => clearInterval(intervalId);
  }, [])

  return (
    <Provider store={store}>
      <Loading></Loading>
      {
        login
          ?
          <PaperProvider>
            <Stack screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="(tab)" />
            </Stack>
          </PaperProvider>
          :
          <LoginComponent></LoginComponent>
      }
    </Provider>
  );
}
