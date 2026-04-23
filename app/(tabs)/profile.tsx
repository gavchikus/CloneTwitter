import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from "react-native";
import { useQuery, useMutation } from "convex/react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { api } from "../../convex/_generated/api";
import { styles } from "../../styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../constants/theme";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user: clerkUser } = useUser();
  
  const dbUser = useQuery(api.users.getUserByClerkId, { 
    clerkId: clerkUser?.id || "" 
  });
  
  const posts = useQuery(api.posts.getPostsByUser, 
    dbUser ? { userId: dbUser._id } : "skip"
  );

  const updateProfile = useMutation(api.users.updateProfile);

  const [editVisible, setEditVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");

  const handleEditPress = () => {
    setFullname(dbUser?.fullname || "");
    setBio(dbUser?.bio || "");
    setEditVisible(true);
  };

  const handleSaveProfile = async () => {
    if (dbUser) {
      await updateProfile({
        userId: dbUser._id,
        fullname,
        bio,
      });
      setEditVisible(false);
    }
  };

  if (!dbUser) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.username}>@{dbUser.username}</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={THEME.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.topSection}>
          <Image source={{ uri: dbUser.image }} style={styles.avatar} />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{posts?.length || 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.nameBioSection}>
          <Text style={styles.fullname}>{dbUser.fullname}</Text>
          <Text style={styles.bio}>{dbUser.bio || "No bio yet"}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={20} color={THEME.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedPost(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.gridItem} />
          </TouchableOpacity>
        )}
      />

      {/* Модалка просмотра поста */}
      <Modal visible={!!selectedPost} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setSelectedPost(null)}
          >
            <Ionicons name="close" size={30} color={THEME.colors.white} />
          </TouchableOpacity>
          {selectedPost && (
            <Image 
              source={{ uri: selectedPost.imageUrl }} 
              style={{ width: "100%", height: 400 }} 
              resizeMode="contain" 
            />
          )}
        </View>
      </Modal>

      {/* Модалка редактирования */}
      <Modal visible={editVisible} animationType="slide">
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.container}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setEditVisible(false)}>
              <Text style={{ color: THEME.colors.white }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.username}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveProfile}>
              <Text style={{ color: THEME.colors.primary, fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style={styles.input} 
              value={fullname} 
              onChangeText={setFullname}
              placeholderTextColor={THEME.colors.grey}
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput 
              style={[styles.input, { height: 100 }]} 
              value={bio} 
              onChangeText={setBio} 
              multiline
              placeholderTextColor={THEME.colors.grey}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}