import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import GameScreen from "./src/screens/GameScreen";
import MusicPlayer from "./src/components/MusicPlayer";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="dark" />
      <MusicPlayer>
        <GameScreen />
      </MusicPlayer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
