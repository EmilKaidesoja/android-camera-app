import React, { Component } from "react";
import { View, Button, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from "../css/camera";
import { saveToCameraRoll, sendPicture, DISCARD_PIC } from "../../store/actions";
import AuxWrapper from "../Utils/AuxWrapper";
import Header from "./Header";

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
    let { picture, pictureSent } = this.props
    return (
      <View className={styles.takenImageContainer}>
        {pictureSent ? <ActivityIndicator size="large" color="#fe9000" style={{ marginTop: "60%" }} /> : (
          <AuxWrapper>
            <Header text={"Image"} showBackButton={true} />
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
          </AuxWrapper>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  let { picture, pictureSent } = state
  return {
    picture, pictureSent
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
