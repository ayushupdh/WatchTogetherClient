import { StyleSheet } from "react-native";
const theme = {
  mainColor: "#313B68",
  blueBackgroundCOlor: "#E2EAF4",
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
    backgroundColor: "#E2EAF4",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
  eightyPercenContainer: {
    flex: 1,
    alignItems: "center",
    width: "80%",
  },
  avatarContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  avatarNameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
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
  selectionTitleText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 5,
    marginTop: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#f6f6f6",
    paddingVertical: 12,
    borderRadius: 20,
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
  nextButton: {
    width: "80%",
    backgroundColor: "#313B68",
    marginVertical: 30,
    paddingVertical: 12,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    alignSelf: "center",
  },
  avatar: {
    width: 118,
    height: 130,
    borderRadius: 40,
  },
  addFriendContainer: {
    backgroundColor: "#F78473",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "flex-start",
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
  customText: {
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "500",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    // borderTopWidth: 1,
  },

  errorText: {
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1,
    color: "red",
    textAlign: "center",
  },
  friends: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    alignSelf: "flex-start",
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
  },
  friendsName: {
    flex: 1,
    fontSize: 22,
    color: "#767676",
    fontWeight: "500",
    paddingLeft: 15,
  },
  movies: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
    overflow: "hidden",
  },
  movieTextContainer: {
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    paddingLeft: 10,
  },
  movieText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    paddingTop: -10,
  },
  movieOverview: {
    fontSize: 12,
    color: "#333",
  },
});
