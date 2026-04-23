import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootLayout from "./(tabs)/_layout";
import ClerkAndConvexProvider from "../providers/ClerkAndConvexProvider";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JetBrainsMono: require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

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
        <RootLayout />
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}