import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { api } from "../../convex/_generated/api";
import { styles } from "../../styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../constants/theme";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user: clerkUser } = useUser();
  const dbUser = useQuery(api.users.getUserByClerkId, { clerkId: clerkUser?.id || "" });
  const posts = useQuery(api.posts.getPostsByUser, dbUser ? { userId: dbUser._id } : "skip");

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.username}>@{dbUser?.username}</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Ionicons name="log-out-outline" size={24} color={THEME.colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {/* Тут буде Grid та інша логіка від наступної ролі */}
    </View>
  );
}