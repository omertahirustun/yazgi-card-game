import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useGameStore } from "../store/gameStore";

const musicSource = require("../../assets/music/background.mp3");

export default function MusicPlayer({ children }: PropsWithChildren) {
  const muted = useGameStore((s) => s.musicMuted);
  const toggleMusic = useGameStore((s) => s.toggleMusic);
  const player = useAudioPlayer(musicSource);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  useEffect(() => {
    player.loop = true;
    player.play();
    return () => {
      player.pause();
    };
  }, [player]);

  useEffect(() => {
    player.muted = muted;
  }, [player, muted]);

  return (
    <View style={styles.root}>
      {children}
      <TouchableOpacity
        style={styles.button}
        onPress={toggleMusic}
        hitSlop={8}
        accessibilityLabel={muted ? "Sesi aç" : "Sesi kapat"}
      >
        <Ionicons
          name={muted ? "volume-mute" : "volume-high"}
          size={22}
          color="#333"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    position: "absolute",
    top: 54,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
});
