import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import styles from "../css/camera"
import AuxWrapper from "../Utils/AuxWrapper";

class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        picSource: "",
    };

    takePicture = async () => {
        console.log("TAKE PICTURE");
        if (this.camera) {
            let picture = await this.camera.takePictureAsync();
            this.setState({ pictureTaken: true, picSource: picture.uri })
        }
    }
    discardPicture = () => {
        this.setState({ pictureTaken: false, picSource: "" })
    }
    render() {
        if (this.state.pictureTaken) {
            return (
                <View className={styles.takenImageContainer} >
                    <Image className={styles.takenImage}
                        source={{ uri: this.state.picSource }} />
                    <Button
                        className={styles.discardButton}
                        onPress={() => this.discardPicture()}
                        title="Discard Photo" />
                </View>
            )
        }
        return (
            <Camera
                className={styles.cameraContainer}
                type={this.state.type}
                ref={ref => {
                    this.camera = ref;
                }}>
                <TouchableOpacity
                    onPress={() => this.takePicture()}
                    className={styles.takePictureButton} />
            </Camera>
        )
    }
} export default Cam;