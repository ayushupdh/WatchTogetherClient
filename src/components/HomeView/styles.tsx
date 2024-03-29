import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2EAF4",
  },

  introText: {
    fontSize: 30,
    marginTop: "20%",
    marginBottom: "20%",
    fontWeight: "bold",
  },
  eightyPercenContainer: {
    flex: 1,
    // justifyContent: "center",
    width: "80%",
    alignItems: "center",
  },
  groupsButton: {
    width: "70%",
    backgroundColor: "#37BEB0",
    padding: 10,
    borderRadius: 30,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
  },
  singleButton: {
    width: "70%",
    backgroundColor: "#313B68",
    padding: 10,
    borderRadius: 30,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 30,
  },
});
