import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import styles from "../css/camera"
import AuxWrapper from "../Utils/AuxWrapper";
import axios from "axios";

class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        picSource: "",
    };

    takePicture = async () => {
        console.log("image captured");
        if (this.camera) {
            let picture = await this.camera.takePictureAsync();
            this.setState({ pictureTaken: true, picSource: picture.uri })
        }
    }
    discardPhoto = () => {
        this.setState({ pictureTaken: false, picSource: "" })
    }



    analyzePhoto = () => {

        const imageData = new FormData();
        imageData.append("image", this.state.picSource)
        axios.post(" http://5c6c8751.ngrok.io")
            .then(res => {
                console.log(res.imageData)
                console.log("image uploaded")
            })
            .catch((error) => {
                console.log("POST")
                console.log(error.code)
               // console.log(error.message)
               // console.log(error.stack)
            })


//      const imageData = new FormData();
//        imageData.append("picture", {uri: imageData.uri, className: "picture", type: "image/jpg"});
//
//       fetch("http://5c6c8751.ngrok.io",{
//           method: "POST",
//                headers: {
//                    'Accept': 'application/json',
//                    'Content-Type': 'application/json',
//                },
//           body: imageData,
//           }).then((res) => {
//
//                console.log("body")
//                .catch((error) => {
//                    console.log(error.message)
//                })
//                
//      });
      

// this.setState({ pictureTaken: true, picSource: "picture.uri" })
    }
    render() {
        if (this.state.pictureTaken) {
            return (
                <View className={styles.takenImageContainer} >
                    <Image className={styles.takenImage}
                        source={{ uri: this.state.picSource }} />
                    <Button
                        className={styles.discardButton}
                        onPress={() => this.discardPhoto()}
                        title="Take new Photo" />
                    <Button
                        className={styles.analyzeButton}
                        onPress={() => this.analyzePhoto()}
                        title="Analyze photo" />
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