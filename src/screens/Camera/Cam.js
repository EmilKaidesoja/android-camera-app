import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    Image,
    CameraRoll
} from "react-native";
import { Camera } from "expo-camera";
import styles from "../../css/camera";
import AuxWrapper from "../../Utils/AuxWrapper";
import Picture from "../Picture";

import {
    RESET_PREDICTION,
    OPEN_IMAGE
} from "../../../store/actions";

class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
    };

    takePicture = async () => {
        if (this.camera) {
            let picture = await this.camera.takePictureAsync();
            this.props.picTaken(picture)
        }
    };
    discardPhoto = () => {
        this.setState({ pictureTaken: false, picSource: "" });
    };
    resetPred = () => {
        this.discardPhoto();
        this.props.resetPrediction();
    };
    render() {
        if (this.props.pictureSent) {
            return <Text>ANIMATION GOES HERE</Text>;
        }
       // if (this.props.openImage) return <Picture />
        return (
            <AuxWrapper>
                <Camera
                    className={styles.cameraContainer}
                    type={this.state.type}
                    ref={ref => {
                        this.camera = ref;
                    }}
                />
                <View className={styles.toolbar}>
                    <TouchableOpacity
                        disabled={this.props.openImage}
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
        predictions, openImage } = state
    return {
        prediction,
        predictions,
        openImage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        picTaken(picture) {
            dispatch({ type: OPEN_IMAGE, picture: picture });
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
