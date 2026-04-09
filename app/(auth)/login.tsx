import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { COLORS } from "../../constants/theme";
import { useRouter } from "expo-router"; // Додай цей імпорт

WebBrowser.maybeCompleteAuthSession();

export default function login() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter(); // Ініціалізуй роутер

  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // ПРИМУСОВИЙ ПЕРЕХІД НА ТАБИ ПІСЛЯ ВХОДУ
        //router.replace("/(tabs)"); 
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/logo-black.png.twimg.1920.png' }} 
        style={styles.logo} 
      />
      <Text style={styles.title}>See what's happening in the world right now.</Text>
      
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', padding: 20 },
  logo: { width: 50, height: 50, alignSelf: 'center', marginBottom: 40, tintColor: COLORS.white },
  title: { fontSize: 30, fontWeight: 'bold', color: COLORS.white, marginBottom: 40, textAlign: 'center' },
  button: { backgroundColor: COLORS.white, padding: 15, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: COLORS.background, fontWeight: 'bold', fontSize: 16 }
});