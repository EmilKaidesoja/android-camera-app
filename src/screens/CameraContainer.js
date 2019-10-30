import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import Cam from "./camera";

async function askCameraPermission() {
  const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    alert('This app needs permission to use camera');
  }
}

class Camera extends Component {
  state = {
    openCamera: false
  }

  componentDidMount() {
    askCameraPermission();
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
