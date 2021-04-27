import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { min } from "react-native-reanimated";

type CountDownProps = {
  onCountDownFinish: () => void;
};

// Custom Timer Component
export const CountDown = (props: CountDownProps) => {
  // Time variable
  const [cTime, setTime] = useState<{ min: string; sec: string }>({
    min: "00",
    sec: "00",
  });
  const [firstRun, setFirstRun] = useState<boolean>(false);

  // Get time from redux
  const { time, startedTime } = useSelector(
    ({ session }: { session: { sessionParams: any } }) => ({
      time: session.sessionParams.time,
      startedTime: session.sessionParams.started_time,
    })
  );

  // Start timer on load
  useEffect(() => {
    if (time !== 0 && startedTime) {
      const s = setInterval(() => {
        updateCountDown(s);
      }, 1000);
      return () => {
        clearInterval(s);
      };
    }
  }, [time, startedTime]);

  // Fancy math function to update countdown
  const updateCountDown = (s: number) => {
    let totalTime = time * 1000 + startedTime;
    let currentTime = Date.now();
    let diff = totalTime - currentTime;
    let min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((diff % (1000 * 60)) / 1000);
    if (min <= 0 && sec <= 0) {
      clearInterval(s);
      props.onCountDownFinish();
      return;
    }
    setTime({ min: ("0" + min).slice(-2), sec: ("0" + sec).slice(-2) });
  };

  // && time !== " 00"
  if (time !== 0) {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
          backgroundColor: "#37BEB0",
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="time-outline" size={20} color="white" />
        <Text
          style={{
            fontSize: 20,
            color: "white",
            paddingLeft: 5,
          }}
        >
          {`${cTime.min}: ${cTime.sec}`}
        </Text>
      </View>
    );
  } else {
    return null;
  }
};
