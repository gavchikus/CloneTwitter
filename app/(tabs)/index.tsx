import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { styles } from "../../styles/feed.styles";
import { Post } from "../../components/Post";
import { Loader } from "../../components/Loader";
import { StoriesSection } from "../../components/StoriesSection";
export default function HomeScreen() {
  const posts = useQuery(api.posts.getPosts);
  const { signOut } = useAuth();

  if (posts === undefined) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>X Clone</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={<StoriesSection />}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}