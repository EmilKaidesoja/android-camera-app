import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    TouchableOpacity,
    Slider,
} from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import styles from "../../css/camera";

import {
    RESET_PREDICTION,
    OPEN_IMAGE
} from "../../../store/actions";
class Cam extends Component {
    state = {
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        flashMode: Camera.Constants.FlashMode.off,
        zoom: 0,
        ratio: "4:3",

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
    async setCameraRatio(e) {
        let { height, width } = e.nativeEvent.layout
        let wantedRatio = height / width
        let currentClosest = 0
        let closestDif = 0
        let index = 0
        let ratios = await this.camera.getSupportedRatiosAsync()

        for (i in ratios) {
            let values = ratios[i].split(":")
            let ratio = parseInt(values[0]) / parseInt(values[1])
            if (i == 0) {
                currentClosest = ratio
                closestDif = wantedRatio - ratio
                closestDif < 0 ? closestDif = closestDif * -1 : null
            }

            if (ratio - currentClosest < closestDif && ratio - currentClosest > closestDif * - 1) {
                currentClosest = ratio
                closestDif = wantedRatio - ratio
                closestDif < 0 ? closestDif = closestDif * -1 : null
                index = i
            }
        }
        this.setState({ ratio: ratios[index] })
    }

    toggleFlash = () => {
        let tempFlash = this.state.flashMode
        if (tempFlash == 3) tempFlash = -1
        if (tempFlash == 1) tempFlash = 2
        this.setState({ flashMode: tempFlash + 1 })
    }
    zoom = (amount) => {
        this.setState({ zoom: amount })
    }
    render() {
        return (
            <Camera
                onLayout={(e) => this.setCameraRatio(e)}
                ratio={this.state.ratio}
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}
                flashMode={this.state.flashMode}
                type={this.state.type}
                zoom={this.state.zoom}
                ref={ref => {
                    this.camera = ref;
                }}>
                <View
                    className={styles.sliderContainer}
                    style={{ transform: [{ rotate: '-90deg' }] }} >
                    <View className={styles.placeholderSlider} />
                    <Slider
                        thumbTintColor="white"
                        onValueChange={(amount) => this.zoom(amount)}
                        className={styles.zoomSlider} />
                </View>
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
            </Camera>
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
