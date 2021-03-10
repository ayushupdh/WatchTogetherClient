import React from "react";
import {
  Text,
  View,
  TextInput,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from "react-native";
import { styles } from "./styles";
type FormFieldProps = {
  title: string;
  placeholder: string;
  value: string;
  onChangeHandler: (name: string) => void;
  error: string;
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
export const FormField = (props: FormFieldProps) => {
  return (
    <View>
      <Text style={styles.groupTitle}>{props.title}</Text>
      <TextInput
        style={styles.groupTextInput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeHandler}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.returnKeyType}
      />
      <View>
        <Text>{props.error}</Text>
      </View>
    </View>
  );
};
