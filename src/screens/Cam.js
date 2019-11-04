import React, { Component } from "react";
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    Image,
    CameraRoll
} from "react-native";
import { Camera } from "expo-camera";
import styles from "../css/camera";
import AuxWrapper from "../Utils/AuxWrapper";
import { connect } from "react-redux";
import Picture from "./Picture";

import {
    sendPicture,
    TAKING_PICTURE,
    RESET_PREDICTION
} from "../../store/actions";

class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        picSource: "",
        pic: ""
    };

    takePicture = async () => {
        if (this.camera) {
            let picture = await this.camera.takePictureAsync();
            this.setState({
                pictureTaken: true,
                picSource: picture.uri,
                pic: picture
            });
        }
    };
    discardPhoto = () => {
        this.setState({ pictureTaken: false, picSource: "" });
    };

    analyzePhoto = () => {
        console.log("image sent to the backend")
        CameraRoll.saveToCameraRoll(this.state.pic.uri, "photo");
        this.props.sendPic(this.state.pic.uri);
    };
    resetPred = () => {
        this.discardPhoto();
        this.props.resetPrediction();
    };
    render() {
        if (this.props.pictureSent) {
            return <Text>ANIMATION GOES HERE</Text>;
        }
        if (this.props.prediction != "") {
            return (
                <View>
                    <Text
                        style={{ position: "absolute", top: 200, left: 100, fontSize: 30 }}
                    >
                        {this.props.prediction}
                    </Text>
                    <View style={{ height: 400 }} />
                    <Button
                        title="Reset"
                        style={{
                            marginTop: "80%",
                            marginLeft: "30%",
                            backgroundColor: "grey"
                        }}
                        onPress={() => this.resetPred()}
                    />
                </View>
            );
        }
        if (this.state.pictureTaken) {
            return (
                <Picture
                    picSource={this.state.picSource}
                    discard={() => this.discardPhoto()}
                    analyze={() => this.analyzePhoto()}
                />
            );
        }
        return (
            <AuxWrapper>
                <Camera
                    className={styles.cameraContainer}
                    type={this.state.type}
                    ref={ref => {
                        this.camera = ref;
                    }}
                ></Camera>
                <View className={styles.toolbar}>
                    <TouchableOpacity
                        disabled={this.state.pictureTaken}
                        onPress={() => this.takePicture()}
                        className={styles.takePictureButton}
                    />
                </View>
            </AuxWrapper>
        );
    }
}
const mapStateToProps = state => {
    let { prediction,
        predictions, } = state
    return {
        prediction,
        predictions,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendPic(localUri) {
            dispatch(sendPicture(localUri));
        },
        resetPrediction() {
            dispatch({ type: RESET_PREDICTION });
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cam);
