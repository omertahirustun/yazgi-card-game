import { View, StyleSheet } from "react-native";
import { useGameStore } from "../store/gameStore";
import Card from "../components/Card";
import StatBar from "../components/StatBar";
import EndingScreen from "../components/EndingScreen";

export default function GameScreen() {
  const currentCardIndex = useGameStore((s) => s.currentCardIndex);
  const stats = useGameStore((s) => s.stats);
  const gameStatus = useGameStore((s) => s.gameStatus);
  const deathReason = useGameStore((s) => s.deathReason);
  const cards = useGameStore((s) => s.cards);
  const makeChoice = useGameStore((s) => s.makeChoice);
  const restart = useGameStore((s) => s.restart);

  if (gameStatus !== "playing") {
    return (
      <View style={styles.container}>
        <EndingScreen
          status={gameStatus}
          deathReason={deathReason}
          onRestart={restart}
        />
      </View>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <View style={styles.container}>
      <View style={styles.statsSection}>
        <StatBar stats={stats} />
      </View>
      {currentCard ? (
        <Card card={currentCard} onSwipe={makeChoice} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },
  statsSection: {
    paddingTop: 40,
  },
});
