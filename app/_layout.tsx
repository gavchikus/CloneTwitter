import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { InitialLayout } from "../components/InitialLayout"; 
import { COLORS } from "../constants/theme";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaProvider style={{ backgroundColor: COLORS.background }}>
          
          <InitialLayout />
          
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}