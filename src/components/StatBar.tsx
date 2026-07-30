import { View, Text, StyleSheet } from "react-native";
import { StatKey } from "../game/engine/types";

const STATS: { key: StatKey; icon: string; label: string; color: string }[] = [
  { key: "aclik", icon: "⊘", label: "Açlık", color: "#e74c3c" },
  { key: "kut", icon: "✦", label: "Kut", color: "#f39c12" },
  { key: "asker", icon: "⚔", label: "Asker", color: "#3498db" },
  { key: "halk", icon: "☰", label: "Halk", color: "#2ecc71" },
];

interface StatBarProps {
  stats: Record<StatKey, number>;
}

export default function StatBar({ stats }: StatBarProps) {
  return (
    <View style={styles.container}>
      {STATS.map((s) => (
        <View key={s.key} style={styles.item}>
          <View style={[styles.iconWrap, { borderColor: s.color }]}>
            <Text style={styles.icon}>{s.icon}</Text>
          </View>
          <Text style={[styles.value, { color: s.color }]}>{stats[s.key]}</Text>
          <Text style={[styles.label, { color: s.color }]}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  item: {
    alignItems: "center",
    gap: 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 16,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
});
