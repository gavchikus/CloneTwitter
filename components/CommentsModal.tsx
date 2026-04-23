import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../constants/theme";
import { formatDistanceToNow } from "date-fns";

export default function CommentsModal({ isOpen, onClose, postId }: { isOpen: boolean, onClose: () => void, postId: any }) {
  const [content, setContent] = useState("");
  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await addComment({ postId, content });
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "flex-end" }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ height: "85%", backgroundColor: THEME.colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <View style={{ padding: 16, borderBottomWidth: 0.5, borderBottomColor: THEME.colors.surface, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: THEME.colors.white, fontSize: 18, fontWeight: "bold" }}>Comments</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={THEME.colors.white} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item }: any) => (
              <View style={{ padding: 16, borderBottomWidth: 0.5, borderBottomColor: THEME.colors.surface }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <Text style={{ color: THEME.colors.white, fontWeight: "bold", marginRight: 8 }}>
                    {item.author?.username || "User"}
                  </Text>
                  <Text style={{ color: THEME.colors.grey, fontSize: 12 }}>
                    {formatDistanceToNow(item._creationTime)} ago
                  </Text>
                </View>
                <Text style={{ color: THEME.colors.white }}>{item.content}</Text>
              </View>
            )}
          />

          <View style={{ padding: 16, borderTopWidth: 0.5, borderTopColor: THEME.colors.surface, flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{ flex: 1, color: THEME.colors.white, backgroundColor: THEME.colors.surface, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12 }}
              placeholder="Post a comment..."
              placeholderTextColor={THEME.colors.grey}
              value={content}
              onChangeText={setContent}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Ionicons name="send" size={24} color={THEME.colors.primary} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}