import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import styles from "../../css/styles";
import { Header } from "react-native-elements";

class Info extends Component {
  render() {
    return (
      <View className={styles.infoContainer}>
        <View className={styles.infoHeader}>
          <Text className={styles.infoHeaderText}>
            Here is some information about our app.
          </Text>
        </View>
        <View className={styles.infoUpper}>
          <Text className={styles.infoUpperText}>
            Placeholder for information
          </Text>
        </View>
        <View className={styles.infoFooter}>
          <Text className={styles.infoFooterText}>
            ©2019 Emil Kaidesoja & Elmeri Kinnunen
          </Text>
        </View>
      </View>
    );
  }
}

export default Info;
