import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import Cam from "./camera";

async function checkMultiPermissions() {
  const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA);
  //console.log(status, "\n", expires, "\n", permissions)
  if (status !== 'granted') {
    alert('This app needs permission to use camera');
  }
}
async function askCameraPermission() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //console.log(status)
}
class Camera extends Component {
  state = {
    openCamera: false
  }

  componentDidMount() {
    askCameraPermission();
  }
  render() {
    if (!this.state.openCamera) {
      return (
        <View>
          <Text>Camera</Text>
          <Button onPress={() => {
            checkMultiPermissions(),
              this.setState({ openCamera: true })
          }} title="Press me" />
        </View>
      )
    } else {
      return <Cam />
    }
  }
}

export default Camera;
