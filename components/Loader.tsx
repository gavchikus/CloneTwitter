import { View, ActivityIndicator } from "react-native";
import { styles } from "../styles/feed.styles";
import { THEME } from "../constants/theme";

export const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={THEME.colors.primary} />
        </View>
    );
};
