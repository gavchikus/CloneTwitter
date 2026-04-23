import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import ClerkAndConvexProvider from "../providers/ClerkAndConvexProvider";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({});

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="user" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}