import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function Layout() {
  return (
    <>
      <StatusBar barStyle="lightContent"
        backgroundColor=" #59B7E3"
        />
        <Stack
        screenOptions={{
          headerShown: false,
        }}
        
      />
    </>
  );
}
