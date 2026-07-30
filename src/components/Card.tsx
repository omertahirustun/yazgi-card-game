import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated, Image } from "react-native";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Card as CardType } from "../game/engine/types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface CardProps {
  card: CardType;
  onSwipe: (direction: "left" | "right") => void;
}

export default function Card({ card, onSwipe }: CardProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const lastGestureX = useRef(0);
  const lastGestureY = useRef(0);

  useEffect(() => {
    translateX.setValue(0);
    translateY.setValue(0);
  }, [card.id]);

  function onGestureEvent(event: PanGestureHandlerGestureEvent) {
    lastGestureX.current = event.nativeEvent.translationX;
    lastGestureY.current = event.nativeEvent.translationY;
    translateX.setValue(event.nativeEvent.translationX);
    translateY.setValue(event.nativeEvent.translationY);
  }

  function onHandlerStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const dx = lastGestureX.current;

      if (dx > SWIPE_THRESHOLD) {
        Animated.timing(translateX, {
          toValue: SCREEN_WIDTH * 1.5,
          duration: 250,
          useNativeDriver: true,
        }).start(() => onSwipe("right"));
      } else if (dx < -SWIPE_THRESHOLD) {
        Animated.timing(translateX, {
          toValue: -SCREEN_WIDTH * 1.5,
          duration: 250,
          useNativeDriver: true,
        }).start(() => onSwipe("left"));
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          friction: 7,
          tension: 60,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          friction: 7,
          tension: 60,
          useNativeDriver: true,
        }).start();
      }
    }
  }

  const rotateZ = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  const leftOpacity = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, -SWIPE_THRESHOLD, 0],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const rightOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD, SCREEN_WIDTH / 2],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });

  const cardStyle = {
    transform: [
      { translateX: translateX },
      { translateY: translateY },
      { rotateZ: rotateZ },
    ],
  };

  const initial = card.characterName.charAt(0).toUpperCase();

  return (
    <View style={styles.wrapper} key={card.id}>
      <View style={styles.slot}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          minDist={10}
        >
          <Animated.View style={[styles.card, cardStyle]}>
            <Animated.View
              style={[styles.overlayLeft, { opacity: leftOpacity }]}
            >
              <Text style={styles.overlayText}>{card.left.text}</Text>
            </Animated.View>
            <Animated.View
              style={[styles.overlayRight, { opacity: rightOpacity }]}
            >
              <Text style={styles.overlayText}>{card.right.text}</Text>
            </Animated.View>

            <View style={styles.imageOuter}>
              {card.image ? (
                <Image source={card.image} style={styles.photoImage} resizeMode="cover" />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoInitial}>{initial}</Text>
                </View>
              )}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>

      <Text style={styles.characterName}>{card.characterName}</Text>
      <Text style={styles.text}>{card.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slot: {
    width: "100%",
    maxWidth: 400,
    height: SCREEN_HEIGHT * 0.45,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d0d0d0",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },
  overlayLeft: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 20,
    zIndex: 3,
    backgroundColor: "rgba(120, 20, 20, 0.9)",
  },
  overlayRight: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    zIndex: 3,
    backgroundColor: "rgba(20, 100, 50, 0.9)",
  },
  overlayText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 24,
    maxWidth: "50%",
  },
  imageOuter: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
  },
  photoInitial: {
    color: "#888",
    fontSize: 48,
    fontWeight: "bold",
  },
  characterName: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 14,
  },
  text: {
    color: "#555",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },
});
