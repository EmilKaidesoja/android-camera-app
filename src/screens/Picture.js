import React, { Component } from "react";
import { View, Button, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../css/camera";

class Picture extends Component {
  render() {
    return (
      <View className={styles.takenImageContainer}>
        <Image
          className={styles.takenImage}
          source={{ uri: this.props.picSource }}
        />
        <View className={styles.TakenImageOption}>
          <TouchableOpacity
            className={styles.discardButton}
            onPress={this.props.discard}
          >
            <Text>Take new photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={styles.analyzeButton}
            onPress={() => this.analyzePhoto()}
          >
            <Text>Analyze photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default connect(
  null,
  null
)(Picture);
