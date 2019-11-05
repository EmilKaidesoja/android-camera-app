import React, { Component } from "react";
import { View, Button, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../css/camera";

class Picture extends Component {
  analyzePhoto = () => {
    console.log("image sent to the backend")
    this.props.saveToCameraRoll(this.props.picSource, 'photo')
    this.props.sendPic(this.props.picSource);
  };
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
const mapStateToProps = state => {
  let { } = state
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendPic(localUri) {
      dispatch(sendPicture(localUri));
    },
    saveToCameraRoll(uri, type) {
      dispatch(saveToCameraRoll(uri, type))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picture);
