import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/feed.styles";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import CommentsModal from "./CommentsModal";
import { useUser } from "@clerk/clerk-expo";

export const Post = ({ post }: any) => {
  const { user: clerkUser } = useUser();
  const currentUser = useQuery(api.users.getUserByClerkId, { clerkId: clerkUser?.id || "" });
  const [showComments, setShowComments] = useState(false);
  
  const toggleLike = useMutation(api.posts.toggleLike);
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
  const deletePost = useMutation(api.posts.deletePost);

  const isOwner = currentUser?._id === post.userId;

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: () => deletePost({ postId: post._id }) }
    ]);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.author?.image }} style={styles.postAvatar} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postUsername}>{post.author?.username}</Text>
          <Text style={styles.postTime}>{formatDistanceToNow(post._creationTime)}</Text>
        </View>
        {isOwner && (
          <TouchableOpacity onPress={handleDelete}>
            <Text>:wastebasket:</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.postCaption}>{post.content}</Text>
      {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}
      
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={() => toggleLike({ postId: post._id })} style={styles.actionButton}>
          <Text>:heart: {post.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowComments(true)} style={styles.actionButton}>
          <Text>:speech_balloon: {post.commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleBookmark({ postId: post._id })} style={styles.actionButton}>
          <Text>:bookmark:</Text>
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