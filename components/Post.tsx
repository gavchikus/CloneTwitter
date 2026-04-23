import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/feed.styles";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import CommentsModal from "./CommentsModal";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../constants/theme";

export const Post = ({ post }: any) => {
  const { user: clerkUser } = useUser();
  const currentUser = useQuery(api.users.getUserByClerkId, { 
    clerkId: clerkUser?.id || "" 
  });
  
  const [showComments, setShowComments] = useState(false);
  
  const toggleLike = useMutation(api.posts.toggleLike);
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
  const deletePost = useMutation(api.posts.deletePost);

  const isOwner = currentUser?._id === post.userId;
  const profileHref = isOwner ? "/(tabs)/profile" : `/user/${post.userId}`;

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: () => deletePost({ postId: post._id }) 
      }
    ]);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Link href={profileHref} asChild>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image source={{ uri: post.author?.image }} style={styles.postAvatar} />
            <View style={styles.postHeaderInfo}>
              <Text style={styles.postUsername}>{post.author?.username}</Text>
              <Text style={styles.postTime}>
                {formatDistanceToNow(post._creationTime, { addSuffix: true })}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>

        {isOwner && (
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color={THEME.colors.red} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.postCaption}>{post.content}</Text>
      
      {post.imageUrl && (
        <Image 
          source={{ uri: post.imageUrl }} 
          style={styles.postImage} 
          resizeMode="cover"
        />
      )}
      
      <View style={styles.postFooter}>
        <TouchableOpacity 
          onPress={() => toggleLike({ postId: post._id })} 
          style={styles.actionButton}
        >
          <Ionicons 
            name={post.isLiked ? "heart" : "heart-outline"} 
            size={22} 
            color={post.isLiked ? THEME.colors.red : THEME.colors.white} 
          />
          <Text style={styles.actionText}>{post.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setShowComments(true)} 
          style={styles.actionButton}
        >
          <Ionicons name="chatbubble-outline" size={20} color={THEME.colors.white} />
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => toggleBookmark({ postId: post._id })} 
          style={styles.actionButton}
        >
          <Ionicons 
            name={post.isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={20} 
            color={THEME.colors.primary} 
          />
        </TouchableOpacity>
      </View>

      <CommentsModal 
        isVisible={showComments} 
        onClose={() => setShowComments(false)} 
        postId={post._id} 
      />
    </View>
  );
};