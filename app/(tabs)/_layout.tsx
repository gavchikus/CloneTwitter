import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: COLORS.background,
        borderTopWidth: 0.5,
        borderTopColor: COLORS.surfaceLight,
        height: 60,
        paddingBottom: 10,
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.grey,
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
      }} />
      <Tabs.Screen name="create" options={{
        title: "Post",
        tabBarIcon: ({ color }) => <MaterialIcons name="add-circle-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="notifications" options={{
        title: "Alerts",
        tabBarIcon: ({ color }) => <MaterialIcons name="notifications-none" size={28} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color }) => <MaterialIcons name="person-outline" size={28} color={color} />,
      }} />
    </Tabs>
  );
}