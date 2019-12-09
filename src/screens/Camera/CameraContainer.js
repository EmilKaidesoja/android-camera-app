import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import Cam from "./Cam";
import { askCameraPermission, askCameraRollPermission } from "../../../store/actions";

class Camera extends Component {

  render() {
    if (this.props.hasCameraPermission) {
      return <Cam />
    } else {
      return <View style={{ marginTop: 200 }} />
    }
  }
}
const mapStateToProps = state => {
  let {
    hasCameraRollPermission,
    hasCameraPermission } = state
  return {
    hasCameraRollPermission,
    hasCameraPermission
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendPic(localUri) {
      dispatch(sendPicture(localUri))
    },
    askForCamPermission() {
      dispatch(askCameraPermission())
    },
    askForCamRollPermission() {
      dispatch(askCameraRollPermission())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Camera);
