import React, { Component, useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
const Modal = ({ message, toggleModal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          //   console.log("Modal has been closed.");
        }}
      >
        <View style={styles.modal}>
          <Text style={styles.text}>Modal is open!</Text>

          <TouchableHighlight
            onPress={() => {
              toggleModal(!modalVisible);
            }}
          >
            <Text style={styles.text}>Close Modal</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
};
export default Modal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7021a",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});
