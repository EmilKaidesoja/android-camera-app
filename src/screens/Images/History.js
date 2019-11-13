import React, { Component } from "react";
import { Text, View, CameraRoll, Button, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../../css/styles"
import { connect } from "react-redux";
import Img from "./Img";
import AuxWrapper from "../../Utils/AuxWrapper";

import { OPEN_IMAGE, loadImages, LOADING_IMAGES } from "../../../store/actions";

const _ = require("underscore")

class History extends Component {
  state = {
    openPhoto: false,
    openPhotoUri: "",
  }
  openImage = (pic) => {
    this.props.openImg(pic)
  }

  discardPhoto = () => {
    this.setState({ openPhoto: false, openPhotoUri: "" })
  }
  closeToBottom = (event) => {
    if (event.contentOffset["y"] > this.props.historyLength && !this.props.loadingImages) {
      return true
    }
  }

  render() {
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
      <View className={styles.container} style={{ paddingBottom: 69 }}>
        <ScrollView onScroll={({ nativeEvent }) => {
          if (this.closeToBottom(nativeEvent)) {
            //this.props.loadMoreImages(this.props.photos.length + 51)
          }
        }}>
          <View className={styles.historyContainer}>
            {images}
          </View>
        </ScrollView>
        {this.props.loadingImages ?
          <ActivityIndicator
            size="large"
            color="#191d31"
            className={styles.loader} /> : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  let { hasCameraRollPermission, photos, openImage,
    historyLength, loadingImages } = state
  return {
    hasCameraRollPermission, photos,
    openImage, historyLength, loadingImages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openImg(pic) {
      dispatch({ type: OPEN_IMAGE, picture: pic })
    },
    loadMoreImages(amount) {
      dispatch({ type: LOADING_IMAGES })
      dispatch(loadImages(amount))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(History);
