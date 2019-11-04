import React, { Component } from "react";
import { Text, View, CameraRoll, Button, ScrollView, TouchableOpacity } from "react-native";
import styles from "../css/styles";
import { connect } from "react-redux";
import Img from "./Img";
import AuxWrapper from "../Utils/AuxWrapper";
import Picture from "./Picture";

class History extends Component {
  state = {
    photos: [],
    openPhoto: false,
    openPhotoUri: "",
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.props.hasCameraRollPermission) {
        let photoConfig = {
          first: 20,
          groupName: "DCIM",
          assetType: 'Photos',
        }
        CameraRoll.getPhotos(photoConfig).then(photos => {
          this.setState({ photos: photos.edges })
        })
      }
    }, 1000);
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
    if (this.state.photos.length > 0) {
      images = this.state.photos.map((photo => {
        return (
          <TouchableOpacity
            key={photo.node.timestamp}
            onPress={() => this.openImage(photo.node.image.uri)} >
            <Img
              imgUri={photo.node.image.uri}
            />
          </TouchableOpacity>
        )
      }))
    }

    return (
      <ScrollView>
        <Text className={styles.text} >Images</Text>
        <View className={styles.historyContainer}>
          {images}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  let { hasCameraRollPermission } = state
  return {
    hasCameraRollPermission
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(History);
