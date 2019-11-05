import React, { Component } from "react";
import { Text, View, CameraRoll, Button, ScrollView, TouchableOpacity } from "react-native";
import styles from "../css/styles";
import { connect } from "react-redux";
import Img from "./Img";
import AuxWrapper from "../Utils/AuxWrapper";
import Picture from "./Picture";

const _ = require("underscore")

class History extends Component {
  state = {
    openPhoto: false,
    openPhotoUri: "",
  }
  openImage = (uri) => {
    this.setState({ openPhoto: true, openPhotoUri: uri })
  }

  discardPhoto = () => {
    this.setState({ openPhoto: false, openPhotoUri: "" })
  }

  render() {
    if (this.state.openPhoto) {
      return <Picture picSource={this.state.openPhotoUri} discard={() => this.discardPhoto()} />
    }

    let images = null
    if (this.props.photos.length > 0) {
      images = _.map(this.props.photos, photo => {
        return (
          <TouchableOpacity
            key={_.uniqueId()}
            onPress={() => this.openImage(photo.node.image.uri)} >
            <Img
              imgUri={photo.node.image.uri}
            />
          </TouchableOpacity>
        )
      })
    }
    return (
      <View className={styles.container}>
        <Text className={styles.text} >Images</Text>
        <ScrollView>
          <View className={styles.historyContainer}>
            {images}
          </View>
        </ScrollView >
      </View>
    );
  }
}
const mapStateToProps = state => {
  let { hasCameraRollPermission, photos } = state
  return {
    hasCameraRollPermission, photos
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(History);
