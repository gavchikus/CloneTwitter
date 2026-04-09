import { View, Text } from "react-native";
import { COLORS } from "../../constants/theme";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: COLORS.white, fontSize: 20 }}>User Profile Screen</Text>
    </View>
  );
}