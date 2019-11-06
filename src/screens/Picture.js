import React, { Component } from "react";
import { View, Button, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../css/camera";
import { saveToCameraRoll, sendPicture, DISCARD_PIC } from "../../store/actions";

class Picture extends Component {
  analyzePhoto = () => {
    console.log("image sent to the backend")
    this.props.saveToCameraRoll(this.props.picture.uri, 'photo')
    this.props.sendPic(this.props.picture.uri);
  };
  discard = () => {
    this.props.discard()
  }
  render() {
    let { picture } = this.props
    return (
      <View className={styles.takenImageContainer}>
        <Image
          className={styles.takenImage}
          source={{ uri: picture.uri }}
        />
        <View className={styles.TakenImageOption}>
          <TouchableOpacity
            className={styles.discardButton}
            onPress={() => this.discard()}
          >
            <Text>Discard photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.analyzeButton}
            onPress={() => this.analyzePhoto()}
          >
            <Text>Send photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  let { picture } = state
  return {
    picture
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendPic(localUri) {
      dispatch(sendPicture(localUri));
    },
    saveToCameraRoll(uri, type) {
      dispatch(saveToCameraRoll(uri, type))
    },
    discard() {
      dispatch({ type: DISCARD_PIC })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picture);
