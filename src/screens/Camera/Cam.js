import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
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

        takePictureConfig : {
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
    render() {
        return (
            <AuxWrapper>
                <Camera
                    className={styles.cameraContainer}
                    type={this.state.type}
                    ref={ref => {
                        this.camera = ref;
                    }}
                />
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
