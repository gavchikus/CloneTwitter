import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "../styles/feed.styles";

export const Post = ({ post }: { post: any }) => {
    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <View style={styles.postAuthorInfo}>
                    <Image source={post.author?.imageUrl} style={styles.postAvatar} />
                    <Text style={styles.postUsername}>{post.author?.firstName || "User"}</Text>
                </View>
                <TouchableOpacity>
                    <Text>🗑️</Text>
                </TouchableOpacity>
            </View>

            {post.content ? (
                <Text style={styles.postContent}>{post.content}</Text>
            ) : null}

            {post.imageUrl ? (
                <Image source={post.imageUrl} style={styles.postImage} contentFit="cover" />
            ) : null}

            <View style={styles.postActions}>
                <TouchableOpacity><Text>{post.isLiked ? "❤️" : "🤍"}</Text></TouchableOpacity>
                <TouchableOpacity><Text>💬</Text></TouchableOpacity>
                <TouchableOpacity><Text>{post.isBookmarked ? "🔖" : "📑"}</Text></TouchableOpacity>
            </View>
        </View>
    );
};
