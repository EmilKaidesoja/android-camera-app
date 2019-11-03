import React, { Component } from "react";
import { Text, View, CameraRoll, Button, ScrollView } from "react-native";
import styles from "../css/styles";
import { connect } from "react-redux";
import Img from "./Img";
import AuxWrapper from "../Utils/AuxWrapper";

class History extends Component {
  state = {
    photos: []
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
          //console.log(photos, " PHOTOS")
          this.setState({ photos: photos.edges })
        })
      }
    }, 1000);
  }
  render() {
    let images = null
    if (this.state.photos.length > 0) {
      images = this.state.photos.map((photo => {
        return (
          <Img key={photo.node.timestamp} imgUri={photo.node.image.uri} />
        )
      }))
    }

    return (
      <ScrollView className={styles.container}>
        <Text className={styles.text} >Images</Text>
          {images}
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
