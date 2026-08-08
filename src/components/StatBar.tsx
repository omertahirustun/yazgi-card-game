import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatKey } from "../game/engine/types";

const ICON_SIZE = 36; // İkonların daha net görünmesi için biraz büyütüldü

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

// Göktürk / Bozkır temalı ikonlar
const STATS: { key: StatKey; icon: IconName }[] = [
  { key: "kut", icon: "fire" }, // Tuğ / Sancak (Otorite ve Bağımsızlık)
  { key: "halk", icon: "tent" }, // Yurt / Otağ (Oba ve Halk)
  { key: "asker", icon: "bow-arrow" }, // Ok ve Yay (Bozkır Savaşçıları)
  { key: "aclik", icon: "food-drumstick" }, // Av Eti / Erzak (Hayvancılık ve Avcılık)
];

interface StatBarProps {
  stats: Record<StatKey, number>;
}

function StatIcon({ icon, value }: { icon: IconName; value: number }) {
  const fill = Math.max(0, Math.min(1, value / 100));
  const anim = useRef(new Animated.Value(fill)).current;

  useEffect(() => {
    // Lapse oyunundaki gibi daha akıcı, stabil bir dolum hissi için
    // spring yerine timing kullanmak daha iyi sonuç verir.
    Animated.timing(anim, {
      toValue: fill,
      useNativeDriver: false, // Height animasyonları native driver desteklemez
      duration: 350,
    }).start();
  }, [fill, anim]);

  const fillHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ICON_SIZE],
  });

  return (
    <View style={styles.iconStack}>
      {/* 1. Katman: Arka plandaki boş/soluk ikon */}
      <View style={styles.iconFixedContainer}>
        <MaterialCommunityIcons name={icon} size={ICON_SIZE} color="#4A4A4A" />
      </View>

      {/* 2. Katman: Kesilmiş (Kırpılmış) animasyonlu alan */}
      <Animated.View style={[styles.fillClip, { height: fillHeight }]}>
        {/* 3. Katman: İçerideki ikon her zaman tam boyutunda ve alttan hizalı kalır */}
        <View style={styles.iconFixedContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={ICON_SIZE}
            color="#FFD700"
          />
        </View>
      </Animated.View>
    </View>
  );
}

export default function StatBar({ stats }: StatBarProps) {
  return (
    <View style={styles.container}>
      {STATS.map((s) => (
        <StatIcon key={s.key} icon={s.icon} value={stats[s.key]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#1c1c1c", // İkonların patlaması için koyu bir arka plan örneği
  },
  iconStack: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    position: "relative",
  },
  iconFixedContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  fillClip: {
    position: "absolute",
    bottom: 0, // Aşağıdan yukarıya doğru büyümesi için
    left: 0,
    right: 0,
    overflow: "hidden", // Yüksekliğin dışına taşan kısımları (ikonun üstünü) gizler
  },
});
