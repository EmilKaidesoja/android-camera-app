import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import styles from "../../css/camera";
import AuxWrapper from "../../Utils/AuxWrapper";

import {
    RESET_PREDICTION,
    OPEN_IMAGE
} from "../../../store/actions";

class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        flashMode: Camera.Constants.FlashMode.on,

        takePictureConfig: {
            skipProcessing: true,
            base64: false,
            exif: false,
        }
    };

    takePicture = async () => {
        if (this.camera) {
            let picture = await this.camera.takePictureAsync(this.state.takePictureConfig);
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
    flashHandler = () => {
        switch (this.state.flashMode) {
            case 0: {
                return "flash-off"
            }
            case 1: {
                return "flash-on"
            }
            case 3: {
                return "flash-auto"
            }
        }
    }
    toggleFlash = () => {
        let tempFlash = this.state.flashMode
        if (tempFlash == 3) tempFlash = -1
        if (tempFlash == 1) tempFlash = 2
        this.setState({ flashMode: tempFlash + 1 })
    }
    render() {
        return (
            <AuxWrapper>
                <Camera
                    className={styles.cameraContainer}
                    flashMode={this.state.flashMode}
                    type={this.state.type}
                    ref={ref => {
                        this.camera = ref;
                    }}
                />
                <View className={styles.flashIcon} >
                    <Icon name={this.flashHandler()}
                        onPress={() => this.toggleFlash()}
                        size={35}
                        color={"#fff"}
                        underlayColor={"transparent"}
                    />
                </View>
                <TouchableOpacity
                    disabled={this.props.openImage}
                    onPress={() => this.takePicture()}
                    className={styles.takePictureButton}
                />
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
