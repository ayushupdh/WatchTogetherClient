import { StatusBar, StyleSheet } from "react-native";
const theme = {
  mainColor: "#313B68",
  blueBackgroundCOlor: "#E2EAF4",
};

const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2EAF4",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 30,
    padding: 10,
    alignSelf: "center",
    fontWeight: "bold",
    // flexShrink: 1,
  },
  textInputView: {
    width: "80%",
    alignSelf: "center",
  },
  inputBox: {
    padding: 15,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginBottom: 20,
    elevation: 5,
  },
  button: {
    width: "80%",
    backgroundColor: theme.mainColor,
    padding: 15,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginTop: 40,
    elevation: 5,
  },
  disabledButton: {
    width: "80%",
    backgroundColor: theme.mainColor,
    padding: 15,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    opacity: 0.5,
    marginTop: 20,
    elevation: 5,
  },
  bottomTextContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  bottomPlainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomPlainTextBlue: {
    fontSize: 20,
    color: "#0085FF",
    marginLeft: 10,
    fontWeight: "bold",
  },

  mainErrorText: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
  },
  passwordBox: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    color: "#000",
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    borderBottomStartRadius: 30,
    borderTopStartRadius: 30,
    elevation: 5,
  },
  passwordReveal: {
    alignSelf: "flex-end",
    color: theme.mainColor,
    marginBottom: 6,
    marginTop: -2,
  },
});
export { AuthStyles };
