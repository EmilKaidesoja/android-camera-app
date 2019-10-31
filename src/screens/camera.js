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
        pic: "",
        prediction: ""
    };

    takePicture = async () => {
        console.log("image captured");
        if (this.camera) {
            let picture = await this.camera.takePictureAsync();
            this.setState({ pictureTaken: true, picSource: picture.uri, pic: picture })
        }
    }
    discardPhoto = () => {
        this.setState({ pictureTaken: false, picSource: "" })
    }

    analyzePhoto = () => {
        console.log("--- ANALYZE CALLED ---")
        let localUri = this.state.pic.uri;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        axios({
            url: "https://d2695ec3.ngrok.io/predict",
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            method: "POST",
            data: formData,
        }).then(response => {
            console.log("--- RESPONSE GOTTEN ---", response.data)
            if (response.status == 200) {

                this.setState({ prediction: response.data, pictureTaken: false })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        if (this.state.prediction != "") {
            return (
                <View>
                    <Text style={{ position: "absolute", top: 200, left: 100, fontSize: 30 }}>
                        {this.state.prediction}</Text>
                        <View style={{height: 400}} />
                    <Button
                        title="Reset"
                        style={{ marginTop: "80%", marginLeft: "30%", backgroundColor: "grey" }}
                        onPress={() => this.setState({ prediction: "" })} />
                </View>
            )
        }
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