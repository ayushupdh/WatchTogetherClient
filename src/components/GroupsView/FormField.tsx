import React from "react";
import {
  Text,
  View,
  TextInput,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { styles } from "./styles";
type FormFieldProps = {
  titleStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  children?: any;
  title: string;
  placeholder: string;
  value: string;
  onChangeHandler: (name: string) => void;
  error: string;
  containerStyle?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  autoFocus?: boolean | undefined;
  returnKeyType?:
    | "done"
    | "go"
    | "next"
    | "search"
    | "send"
    | "none"
    | "previous"
    | "default"
    | "google"
    | "join"
    | "route"
    | "yahoo"
    | "emergency-call"
    | undefined;

  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
};

// Custom Form Field component used in the Groups View
export const FormField = (props: FormFieldProps) => {
  return (
    <View style={props.containerStyle}>
      <Text style={props.titleStyle || styles.groupTitle}>{props.title}</Text>
      <TextInput
        style={[
          props.textInputStyle || styles.groupTextInput,
          props.error ? { borderColor: "red", borderWidth: 1 } : null,
        ]}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeHandler}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.returnKeyType}
        onFocus={props.onFocus}
        autoFocus={props.autoFocus || false}
      >
        {props.children}
      </TextInput>

      {props.error !== "" && (
        <View>
          <Text style={{ color: "red", padding: 2, marginLeft: 12 }}>
            {props.error}
          </Text>
        </View>
      )}
    </View>
  );
};
