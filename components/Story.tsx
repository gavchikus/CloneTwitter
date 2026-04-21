import { View, Text } from "react-native";
import { Image } from "expo-image";
import { styles } from "../styles/feed.styles";

export const Story = ({ story }: { story: any }) => {
    return (
        <View style={styles.storyWrapper}>
            <View
                style={[
                    styles.storyRing,
                    story.hasStory ? styles.storyRingActive : styles.storyRingInactive,
                ]}
            >
                <Image source={story.image} style={styles.storyAvatar} />
            </View>
            <Text style={styles.storyUsername}>{story.username}</Text>
        </View>
    );
};