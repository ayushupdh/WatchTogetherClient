import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#E2EAF4",
    alignItems: "center",
  },
  spinnerConatiner: {
    zIndex: 5,
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "transparent",
  },
  spinner: {
    flex: 1,
  },
  title: {
    alignItems: "flex-start",
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    paddingLeft: 20,
  },
  changeText: {
    marginTop: 15,
    fontSize: 13,
    fontWeight: "500",
  },
  textInput: {
    padding: 14,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderColor: "#000",
    backgroundColor: "#FAFAFA",
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginVertical: 5,
    elevation: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginVertical: 50,
    backgroundColor: "#313B68",
    width: "80%",
    padding: 12,
    borderRadius: 30,
    borderColor: "#000",
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
    fontSize: 20,
    fontWeight: "500",
  },
  avatar: {
    width: 118,
    height: 130,
    borderRadius: 40,
  },
  imageContainer: {
    alignItems: "center",
  },
});
