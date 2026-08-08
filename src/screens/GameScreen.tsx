import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGameStore } from "../store/gameStore";
import Card from "../components/Card";
import StatBar from "../components/StatBar";
import EndingScreen from "../components/EndingScreen";

export default function GameScreen() {
  const currentCardId = useGameStore((s) => s.currentCardId);
  const stats = useGameStore((s) => s.stats);
  const gameStatus = useGameStore((s) => s.gameStatus);
  const deathReason = useGameStore((s) => s.deathReason);
  const deathDirection = useGameStore((s) => s.deathDirection);
  const cards = useGameStore((s) => s.cards);
  const cardsPlayedCount = useGameStore((s) => s.cardsPlayedCount);
  const makeChoice = useGameStore((s) => s.makeChoice);
  const restart = useGameStore((s) => s.restart);
  const startRun = useGameStore((s) => s.startRun);
  const year = useGameStore((s) => s.year);

  useEffect(() => {
    if (currentCardId === null && gameStatus === "playing") {
      startRun();
    }
  }, [currentCardId, gameStatus, startRun]);

  if (gameStatus !== "playing") {
    return (
      <View style={styles.container}>
        <EndingScreen
          status={gameStatus}
          deathReason={deathReason}
          deathDirection={deathDirection}
          cardsPlayed={cardsPlayedCount}
          onRestart={restart}
        />
      </View>
    );
  }

  const currentCard = cards.find((c) => c.id === currentCardId);

  return (
    <View style={styles.container}>
      <View style={styles.statsSection}>
        <StatBar stats={stats} />
      </View>
      {currentCard ? <Card card={currentCard} onSwipe={makeChoice} /> : null}
      <Text style={styles.year}>MS {year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },
  statsSection: {
    paddingTop: 60,
  },
  year: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    color: "#5a5a5a",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
