import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity, Image, CameraRoll } from "react-native";
import { Camera } from "expo-camera";
import styles from "../css/camera"
import AuxWrapper from "../Utils/AuxWrapper";
import { connect } from "react-redux";
import { sendPicture } from "../../store/actions";

class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        picSource: "",
        pic: "",
        prediction: ""
    };

    takePicture = async () => {
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
        CameraRoll.saveToCameraRoll(this.state.pic.uri, "photo")
        this.props.sendPic(this.state.pic.uri)
       
    }
    render() {
        if (this.state.prediction != "") {
            return (
                <View>
                    <Text style={{ position: "absolute", top: 200, left: 100, fontSize: 30 }}>
                        {this.state.prediction}</Text>
                    <View style={{ height: 400 }} />
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
}
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendPic(localUri) {
            dispatch(sendPicture(localUri))
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cam);