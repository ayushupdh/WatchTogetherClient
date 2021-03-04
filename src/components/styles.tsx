import { StyleSheet } from "react-native";

const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2EAF4",
    justifyContent: "center",
    alignItems: "center",
  },
  safeContainer: {},
  title: {
    fontSize: 30,
    padding: 50,

    alignSelf: "center",
    fontWeight: "bold",
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
  },
  button: {
    width: "80%",
    backgroundColor: "#313B68",
    // textAlign: "center",
    padding: 15,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginTop: 40,
  },
  altTextContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  altText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  altTextBlue: {
    fontSize: 20,
    color: "#0085FF",
    marginLeft: 10,
    fontWeight: "bold",
  },
  tempText: {
    fontSize: 20,
  },
  errorText: {
    marginLeft: 10,
    color: "red",
    paddingBottom: 10,
    // marginTop: 10,
  },
  errorBox: { borderColor: "red", borderWidth: 3, marginBottom: 5 },
  mainErrorText: {
    // alignSelf: "auto",
    color: "red",
    fontSize: 18,
    // paddingBottom: 0,
    marginTop: 10,
  },
  passwordBox: {
    flex: 1,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#fff",
    color: "#000",
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  iconContainer: {
    padding: 15,
    backgroundColor: "#fff",
    shadowOffset: { width: 4.5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    borderBottomEndRadius: 30,
    borderTopEndRadius: 30,
  },
});
export { AuthStyles };

/* Rectangle 9 */
// /* Rectangle 9 */

// position: absolute;
// width: 316px;
// height: 61px;
// left: 45px;
// top: 705px;

// background: #313B68;
// border-radius: 50px;
