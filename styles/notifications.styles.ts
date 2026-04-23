import { StyleSheet } from "react-native";
import { THEME } from "../constants/theme";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background },
  header: { padding: 16, borderBottomWidth: 0.5, borderBottomColor: THEME.colors.surface },
  headerTitle: { color: THEME.colors.white, fontSize: 20, fontWeight: "bold" },
  item: { flexDirection: "row", padding: 16, borderBottomWidth: 0.5, borderBottomColor: THEME.colors.surface },
  avatarContainer: { position: "relative" },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  badge: { position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  content: { flex: 1, marginLeft: 12, justifyContent: "center" },
  userText: { color: THEME.colors.white, fontWeight: "bold" },
  actionText: { color: THEME.colors.grey },
  timeText: { color: THEME.colors.grey, fontSize: 12, marginTop: 2 },
  postImage: { width: 50, height: 50, borderRadius: 8, marginLeft: 8 }
});
