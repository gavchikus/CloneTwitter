import React, { useState } from "react";
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Image 
} from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../constants/theme";
import { formatDistanceToNow } from "date-fns";

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: any;
}

export default function CommentsModal({ isOpen, onClose, postId }: CommentsModalProps) {
  const [content, setContent] = useState("");
  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await addComment({ postId, content });
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ 
            height: "85%", 
            backgroundColor: THEME.colors.background, 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20 
          }}
        >
          <View style={{ 
            padding: 16, 
            borderBottomWidth: 0.5, 
            borderBottomColor: THEME.colors.surface, 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={{ color: THEME.colors.text, fontSize: 18, fontWeight: "bold" }}>Коментарі</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={26} color={THEME.colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ 
                padding: 16, 
                borderBottomWidth: 0.5, 
                borderBottomColor: THEME.colors.surface,
                flexDirection: "row" 
              }}>
                <Image 
                  source={{ uri: item.user?.image }} 
                  style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }} 
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: THEME.colors.text, fontWeight: "bold", marginRight: 8 }}>
                      {item.user?.username || "user"}
                    </Text>
                    <Text style={{ color: THEME.colors.textSecondary, fontSize: 12 }}>
                      {formatDistanceToNow(item._creationTime)} тому
                    </Text>
                  </View>
                  <Text style={{ color: THEME.colors.text, marginTop: 4 }}>{item.content}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
                <Text style={{ color: THEME.colors.textSecondary }}>Ще немає коментарів. Будь першим!</Text>
              </View>
            )}
          />

          <View style={{ 
            padding: 16, 
            paddingBottom: Platform.OS === "ios" ? 30 : 16,
            borderTopWidth: 0.5, 
            borderTopColor: THEME.colors.surface, 
            flexDirection: "row", 
            alignItems: "center" 
          }}>
            <TextInput
              style={{ 
                flex: 1, 
                color: THEME.colors.text, 
                backgroundColor: THEME.colors.surface, 
                borderRadius: 20, 
                paddingHorizontal: 16, 
                paddingVertical: 10, 
                marginRight: 12 
              }}
              placeholder="Напишіть коментар..."
              placeholderTextColor={THEME.colors.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
            />
            <TouchableOpacity 
              onPress={handleSubmit}
              disabled={!content.trim()}
              style={{ opacity: content.trim() ? 1 : 0.5 }}
            >
              <Ionicons name="send" size={24} color={THEME.colors.primary} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}