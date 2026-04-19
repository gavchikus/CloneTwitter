import { SafeAreaView } from "react-native-safe-area-context";
import { InitialLayout } from "../components/InitialLayout"; // З фігурними дужками!
import ClerkAndConvexProvider from "../providers/ClerkAndConvexProvider";

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
        <InitialLayout />
      </SafeAreaView>
    </ClerkAndConvexProvider>
  );
}