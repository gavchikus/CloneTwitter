import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { styles } from "../../styles/feed.styles";
import { STORIES } from "../../constants/mock-data";
import { Story } from "../../components/Story";
import { Post } from "../../components/Post";
import { Loader } from "../../components/Loader";

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

      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        >
          {STORIES.map((story: any) => (
            <Story key={story.id} story={story} />
          ))}
        </ScrollView>

        <View>
          {posts.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}