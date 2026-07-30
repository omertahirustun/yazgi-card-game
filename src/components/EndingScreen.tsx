import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatKey } from "../game/engine/types";

const DEATH_MESSAGES: Record<StatKey, string> = {
  aclik: "Halkın açlığa dayanamadı. Krallığın çöktü.",
  kut: "Kut'u kaybettin. Tanrı seni terk etti.",
  asker: "Ordun dağıldı. Düşmana karşı koyamadın.",
  halk: "Halk ayaklandı ve seni devirdi.",
};

const SURVIVE_MESSAGE = "Bütün zorluklara rağmen hayatta kaldın. Şimdilik...";

interface EndingScreenProps {
  status: "dead" | "survived";
  deathReason?: StatKey;
  onRestart: () => void;
}

export default function EndingScreen({
  status,
  deathReason,
  onRestart,
}: EndingScreenProps) {
  const message =
    status === "dead" && deathReason
      ? DEATH_MESSAGES[deathReason]
      : SURVIVE_MESSAGE;

  const title = status === "dead" ? "SON" : "KAÇIŞ YOK";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>Yeniden Başla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#d4d4d4",
    gap: 24,
  },
  title: {
    color: "#333",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  message: {
    color: "#666",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
