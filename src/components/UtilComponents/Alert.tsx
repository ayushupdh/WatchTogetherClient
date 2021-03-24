import { Alert } from "react-native";
type AlertProp = {
  firstText: string;
  secondText?: string;
  firstButtonText: string;
  firstButtonHandleClose?: () => void;
  secondButtonText?: string;
  secondButtonHandleClose?: () => void;
};

export const showAlert = (props: AlertProp) => {
  Alert.alert(props.firstText, props.secondText ? props.secondText : "", [
    {
      text: props.firstButtonText,
      style: "cancel",
      onPress: props.firstButtonHandleClose
        ? props.firstButtonHandleClose
        : () => {},
    },
    props.secondButtonText
      ? {
          text: props.secondButtonText,
          style: "cancel",
          onPress: props.secondButtonHandleClose
            ? props.secondButtonHandleClose
            : () => {},
        }
      : {},
  ]);
};
