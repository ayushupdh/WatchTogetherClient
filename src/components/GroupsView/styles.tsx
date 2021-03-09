import { StyleSheet, StatusBar } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  createButton: {
    backgroundColor: "#F78473",
    width: "40%",
    padding: 10,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 30,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    padding: 15,
    borderRadius: 20,
    borderColor: "#000",
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  smallDot: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 4,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 22,
  },
});
