import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../constants/theme";

const { width } = Dimensions.get("window");
const SIZE = width / 3;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  username: { color: THEME.colors.white, fontSize: 18, fontWeight: "bold" },
  profileInfo: { paddingHorizontal: 16, marginBottom: 20 },
  topSection: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  statsContainer: { flexDirection: "row", flex: 1, justifyContent: "space-around", marginLeft: 20 },
  statItem: { alignItems: "center" },
  statNumber: { color: THEME.colors.white, fontWeight: "bold", fontSize: 18 },
  statLabel: { color: THEME.colors.grey, fontSize: 13 },
  nameBioSection: { marginTop: 12 },
  fullname: { color: THEME.colors.white, fontWeight: "bold", fontSize: 16 },
  bio: { color: THEME.colors.white, marginTop: 4, lineHeight: 20 },
  actionButtons: { flexDirection: "row", paddingHorizontal: 16, gap: 10, marginBottom: 20 },
  editButton: { flex: 1, backgroundColor: THEME.colors.surface, padding: 10, borderRadius: 8, alignItems: "center" },
  shareButton: { backgroundColor: THEME.colors.surface, padding: 10, borderRadius: 8, width: 45, alignItems: "center" },
  buttonText: { color: THEME.colors.white, fontWeight: "600" },
  gridItem: { width: SIZE, height: SIZE, borderWidth: 0.5, borderColor: THEME.colors.background },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center" },
  closeButton: { position: "absolute", top: 50, right: 20, zIndex: 10 },
  inputGroup: { padding: 16 },
  label: { color: THEME.colors.grey, marginBottom: 8 },
  input: { backgroundColor: THEME.colors.surface, color: THEME.colors.white, padding: 12, borderRadius: 8, marginBottom: 16 }
});
