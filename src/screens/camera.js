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

    imageSelectHandler = e =>{
        this.setState({
            selectedImage: e.target.picSource
        })
    }

    imageUploadHandler = () => {
        
    }

    analyzePhoto = () => {

//        const imageData = new FormData();
//        imageData.append("image", this.state.selectedImage)
//        axios.post("http://127.0.0.1:8000/picture")
//            .then(res => {
//                console.log(res.imageData)
//                console.log("image uploaded")
//            })
//            .catch((error) => {
//                console.log(error.code)
//                console.log(error.message)
//                console.log(error.stack)
//            })


        let imageData = new FormData();
        imageData.append("picture", this.state.picSource);

       fetch("http://localhost:5000/picture",{
           method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
           body: imageData,
           }).then((res) => {

                console.log("vittusaatana")
                .catch((error) => {
                    console.log(error)
                })

             res.json().then((body) => {
             this.setState({pictureURL: "http://localhost:5000/picture"});

                console.log("vittu")
                .catch((error) => {
                    console.log(error)
                })
           });
           
      });

// this.setState({ pictureTaken: true, picSource: picture.uri })
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