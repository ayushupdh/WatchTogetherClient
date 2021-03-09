import { StyleSheet } from "react-native";
const theme = {
  mainColor: "#313B68",
  blueBackgroundCOlor: "#E2EAF4",
};

export const Styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "#f6f6f6",
    padding: 10,
    borderRadius: 30,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
  buttonText: {
    color: "#4a4a4a",
    fontSize: 20,
    fontWeight: "bold",
  },
  redButton: {
    width: "80%",
    backgroundColor: "#850000",
    padding: 10,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
});
