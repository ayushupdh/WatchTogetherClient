import React from "react";
import {
  Pressable,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";

type GenreListProps = {
  data: string[] | undefined;
  onSelect: (item: string) => void;
};
export const GenreList = (props: GenreListProps) => {
  const renderGenres = ({ item }: { item: string }) => {
    return (
      <>
        {props.data && props.data.length === 1 && (
          <Pressable
            style={({ pressed }) => [
              styles.crossBox,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={() => props.onSelect(item)}
          >
            <Text style={styles.crossBoxText}>x</Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.genreBox,
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor:
                props.data && props.data.length === 1 ? "#313B68" : "white",
            },
          ]}
          onPress={() => props.onSelect(item)}
        >
          <Text
            style={[
              styles.genreText,
              {
                color:
                  props.data && props.data.length === 1 ? "white" : "black",
              },
            ]}
          >
            {item}
          </Text>
        </Pressable>
      </>
    );
  };
  return (
    <View style={{ paddingVertical: 10 }}>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 20 }}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderGenres}
        data={props.data}
        keyExtractor={(item: string) => item}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genreBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
  },
  genreText: {
    fontSize: 18,
    fontWeight: "400",
  },
  crossBox: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#313B68",
    margin: 5,
    borderRadius: 40,
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
    justifyContent: "center",
  },
  crossBoxText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
