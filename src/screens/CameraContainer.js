import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import Cam from "./Cam";

async function askCameraPermission() {
  const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    alert('This app needs permission to use camera');
  }
}
async function askCameraRollPermission() {
  const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  if (status !== 'granted') {
    alert('This app needs permission to use gallery');
  }
}

class Camera extends Component {
  state = {
    openCamera: false
  }

  componentDidMount() {
    askCameraPermission();
    askCameraRollPermission()
    setTimeout(() => {
      this.setState({ openCamera: true })
    }, 0);
  }
  render() {
    if (this.state.openCamera) {
      return <Cam />
    } else {
      return (
        <View style={{ marginTop: 200 }}>
          <Text>Camera</Text>
          <Button
            onPress={() => this.setState({ openCamera: true })}
            title="Press me" />
        </View>)
    }
  }
}

export default Camera;
