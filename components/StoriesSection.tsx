import React from "react";
import { ScrollView } from "react-native";
import { styles } from "../styles/feed.styles";
import { Story } from "./Story";
import { STORIES } from "../constants/mock-data";

export const StoriesSection = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContainer}
        >
            {STORIES.map((story: any) => (
                <Story key={story.id} story={story} />
            ))}
        </ScrollView>
    );
};