import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2EAF4",
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: "#6C63FF",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 10,
    fontSize: 30,
    fontWeight: "600",
    color: "#fff",
  },
  subtextContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  subtext: {
    fontSize: 20,
    color: "black",
    marginBottom: 20,
  },
});
