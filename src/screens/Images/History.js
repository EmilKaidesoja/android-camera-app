import React, { Component } from "react";
import { Text, View, CameraRoll, Button, ScrollView, TouchableOpacity, TouchableHighlight } from "react-native";
import styles from "../../css/styles"
import { connect } from "react-redux";
import Img from "./Img";
import AuxWrapper from "../../Utils/AuxWrapper";
import Picture from "../Picture";

import { OPEN_IMAGE } from "../../../store/actions";

const _ = require("underscore")

class History extends Component {
  state = {
    openPhoto: false,
    openPhotoUri: "",
  }
  openImage = (pic) => {
    //this.setState({ openPhoto: true, openPhotoUri: uri })
    this.props.openImg(pic)
  }

  discardPhoto = () => {
    this.setState({ openPhoto: false, openPhotoUri: "" })
  }

  render() {
    // if (this.props.openImage) return <Picture />

    let images = null
    if (this.props.photos.length > 0) {
      images = _.map(this.props.photos, photo => {
        return (
          <TouchableOpacity
            key={_.uniqueId()}
            onPress={() => this.openImage(photo.node.image)} >
            <Img
              imgUri={photo.node.image.uri}
            />
          </TouchableOpacity>
        )
      })
    }
    return (
      <View className={styles.container}>
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
  let { hasCameraRollPermission, photos, openImage } = state
  return {
    hasCameraRollPermission, photos, openImage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openImg(pic) {
      dispatch({ type: OPEN_IMAGE, picture: pic })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(History);
