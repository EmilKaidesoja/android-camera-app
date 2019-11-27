import React, { Component } from "react";
import { Text, View, CameraRoll, Button, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
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
  renderPhoto = (photo) => {
    return (
      <TouchableOpacity
        className={styles.imgContainer}
        key={_.uniqueId()}
        onPress={() => this.openImage(photo.item.node.image)} >
        <Img
          imgUri={photo.item.node.image.uri}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View className={styles.container} style={{ paddingBottom: 69 }}>
        <SafeAreaView>
          {this.props.photos.length > 0 ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.photos}
              renderItem={(photo) => this.renderPhoto(photo)}
              keyExtractor={() => _.uniqueId()}
              numColumns={3}
              initialNumToRender={12}
              onEndReached={() => this.props.loadMoreImages(this.props.photos.length + 51)}
              onEndReachedThreshold={0.5}
              onRefresh={() => this.props.loadInitialImages(102)}
              refreshing={this.props.loadingImages}
            />
            : (
              <View>
                <Text
                  style={{ textAlign: "center", fontSize: 20, marginTop: 100 }}
                >No photos
              </Text>
              </View>)
          }
        </SafeAreaView>
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
    },
    loadInitialImages(amount) {
      dispatch(loadImages(amount))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(History);
