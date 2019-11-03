import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import Cam from "./Cam";
import { askCameraPermission, askCameraRollPermission } from "../../store/actions";

class Camera extends Component {
  state = {
    openCamera: false
  }

  componentDidMount() {
    let { hasCameraPermission,
      hasCameraRollPermission,
      askForCamPermission,
      askForCamRollPermission } = this.props

    if (!hasCameraPermission) {
      askForCamPermission()
    }
    if (!hasCameraRollPermission) {
      askForCamRollPermission()
    }

  }
  componentDidUpdate() {
    let { hasCameraPermission,
      hasCameraRollPermission } = this.props

    if (hasCameraRollPermission && hasCameraPermission) {
      setTimeout(() => {
        this.setState({ openCamera: true })
      }, 0);
    }
  }
  render() {
    if (this.state.openCamera) {
      return <Cam />
    } else {
      return (
        <View style={{ marginTop: 200 }}>
         {/* <Text>Camera</Text>
          <Button
            onPress={() => this.setState({ openCamera: true })}
          title="Press me" />*/}
        </View>)
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
