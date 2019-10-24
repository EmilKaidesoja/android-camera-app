import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../css/styles";

class History extends Component {
  render() {
    return (
      <View className={styles.container}>
        <Text className={styles.text} >Images</Text>
      </View>
    );
  }
}

export default History;
