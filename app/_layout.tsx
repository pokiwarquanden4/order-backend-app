import { Loading } from "@/components/loading/Loading";
import LoginComponent from "@/components/Login/LoginComponent";
import { Stack } from "expo-router";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [login, setLogin] = useState<boolean>(true)

  return (
    <>
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
    </>
  );
}
