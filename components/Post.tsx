import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/feed.styles";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export type PostProps = {
    post: {
        _id: any;
        _creationTime: number;
        content?: string;
        imageUrl?: string;
        likesCount: number;
        author?: {
            username?: string;
            image?: string;
        } | null;
    };
};

export const Post = ({ post }: PostProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);
    const toggleLikeMutation = useMutation(api.posts.toggleLike);

    const timeAgo = formatDistanceToNow(new Date(post._creationTime), { addSuffix: true });

    const handleLike = async () => {
        const previousIsLiked = isLiked;
        const previousCount = likesCount;

        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

        try {
            const result = await toggleLikeMutation({ postId: post._id });
            setIsLiked(result);
        } catch (error) {
            setIsLiked(previousIsLiked);
            setLikesCount(previousCount);
        }
    };

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Image
                    source={{ uri: post.author?.image || "https://via.placeholder.com/40" }}
                    style={styles.postAvatar}
                />
                <View style={styles.postHeaderInfo}>
                    <Text style={styles.postUsername}>{post.author?.username || "Unknown"}</Text>
                    <Text style={styles.postTime}>{timeAgo}</Text>
                </View>
            </View>

            {post.content && <Text style={styles.postCaption}>{post.content}</Text>}

            {post.imageUrl && (
                <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}

            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                    <Text style={[styles.actionText, isLiked && { color: "red" }]}>
                        {isLiked ? "❤️" : "🤍"} {likesCount}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};