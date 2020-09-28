import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React, { useState } from "react";
import { getRandomInt } from "./utils";

const EMOJI_LIST = ["❤️", "🤩", "🤣", "😎", "🤓", "🎉", "🤯", "😭", "👀"];

function AnimatedReaction({ value, emoji }) {
  const positionY = useSharedValue(-40);
  const fontSizeValue = useSharedValue(40);
  const [selected, setSelected] = useState(Math.random() >= 0.5);

  const moveCounter = () => {
    selected
      ? (positionY.value = positionY.value + 45)
      : (positionY.value = positionY.value - 45);
    setSelected((selected) => !selected);
    fontSizeValue.value = 30;
  };

  const animatedCounterStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            positionY.value,
            { duration: 100, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
            () => (fontSizeValue.value = 40)
          ),
        },
      ],
    };
  });

  const animatedEmojiStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(fontSizeValue.value),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={moveCounter}>
      <View style={styles.reactionSeparator}>
        <View
          style={[
            styles.reactionContainer,
            selected && styles.selectedExtraReactionStyles,
          ]}
        >
          <Animated.Text style={[styles.emojiStyles, animatedEmojiStyle]}>
            {emoji}
          </Animated.Text>
          <View style={styles.textsContainer}>
            <Animated.View style={animatedCounterStyle}>
              <Text
                style={[
                  styles.textStyles,
                  selected && styles.selectedExtraTextStyles,
                ]}
              >
                {value - 1}
              </Text>
              <Text
                style={[
                  styles.textStyles,
                  selected && styles.selectedExtraTextStyles,
                ]}
              >
                {value}
              </Text>
              <Text
                style={[
                  styles.textStyles,
                  selected && styles.selectedExtraTextStyles,
                ]}
              >
                {value + 1}
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {EMOJI_LIST.map((emoji) => (
          <AnimatedReaction
            value={getRandomInt(1, 100)}
            emoji={emoji}
            key={emoji}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  wrapper: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  reactionSeparator: {
    flexBasis: "33%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  reactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#323232",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: 53,
  },
  textsContainer: {
    marginLeft: 5,
    flexGrow: 0,
    height: 49,
    overflow: "hidden",
  },
  textStyles: {
    fontSize: 28,
    fontWeight: "500",
    color: "white",
    marginVertical: 5,
  },
  selectedExtraTextStyles: {
    color: "#9CA4B4",
  },
  selectedExtraReactionStyles: {
    backgroundColor: "#3B4B6C",
  },
  emojiStyles: {
    fontSize: 40,
    minWidth: 40,
    textAlign: "center",
  },
});
