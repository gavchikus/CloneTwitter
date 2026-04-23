import { View, FlatList, Image, Dimensions, Text } from "react-native";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { THEME } from "../../constants/theme";

const { width } = Dimensions.get("window");
const SIZE = width / 3;

export default function BookmarksScreen() {
  const { isAuthenticated } = useConvexAuth();
  const bookmarks = useQuery(
    api.bookmarks.getBookmarkedPosts,
    isAuthenticated ? {} : "skip"
  );

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: THEME.colors.white }}>No bookmarks yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarks}
      numColumns={3}
      keyExtractor={(item: any) => item._id}
      renderItem={({ item }: any) => (
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: SIZE,
            height: SIZE,
            borderWidth: 0.5,
            borderColor: THEME.colors.background,
          }}
        />
      )}
      style={{ backgroundColor: THEME.colors.background }}
    />
  );
}
