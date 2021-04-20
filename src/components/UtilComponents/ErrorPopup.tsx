import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

type ErrorPopupProps = {
  error: string;
  color?: string;
};
export const ErrorPopup = (props: ErrorPopupProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <View
        style={{
          width: "90%",
          alignItems: "center",
          paddingVertical: 12,
          position: "absolute",
          bottom: 20,
          backgroundColor: props.color || "#2D3047",
          borderRadius: 12,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          {props.error}
        </Text>
      </View>
    </Animated.View>
  );
};
