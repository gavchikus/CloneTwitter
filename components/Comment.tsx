import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../styles/feed.styles";
import { formatDistanceToNow } from "date-fns";

export const Comment = ({ comment }: any) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Image source={{ uri: comment.author?.image }} style={styles.postAvatar} />
      <View>
        <Text style={styles.postUsername}>{comment.author?.username}</Text>
        <Text style={styles.postTime}>
          {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
    <Text style={styles.postCaption}>{comment.content}</Text>
  </View>
);