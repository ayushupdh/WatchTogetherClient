import { StyleSheet } from "react-native";
const theme = {
  mainColor: "#313B68",
  blueBackgroundCOlor: "#E2EAF4",
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    backgroundColor: "#E2EAF4",
  },
  avatarContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 50,
  },
  avatarNameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 20,
    flexShrink: 1,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    // flexWrap: "wrap",
  },
  editprofileButton: {
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
  editprofileButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    backgroundColor: "#f6f6f6",
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
  buttonText: {
    color: "#4a4a4a",
    fontSize: 22,
    fontWeight: "bold",
  },
  redButton: {
    width: "80%",
    backgroundColor: "#850000",
    paddingVertical: 12,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 118,
    height: 130,
    borderRadius: 40,
  },
});
