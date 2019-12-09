import React, { Component } from "react";
import { connect } from "react-redux";
import Slick from "react-native-slick";
import { StyleSheet, Alert, BackHandler, View, Text } from "react-native";
import * as Permissions from "expo-permissions";

import {
  CAMERA_PERMISSION_GRANTED,
  CAMERA_ROLL_PERMISSION_GRANTED,
  loadImages,
  RESET_ERROR,
  RESET_PREDICTION,
  DISCARD_PIC,
  SLICK_CONFIG,
  SET_SLICK_INDEX
} from "../../store/actions";

import CameraContainer from "../screens/Camera/CameraContainer";
import InfoContainer from "../screens/Info/InfoContainer";
import AuxWrapper from "../Utils/AuxWrapper";
import History from "../screens/Images/History";
import PredictionModal from "../screens/PredictionModal";
import Picture from "../screens/Picture";
import { ScreenOrientation } from "expo";
import Header from "../screens/Header";
import Toolbar from "../screens/Toolbar";

let _ = require("underscore");
class AppContainer extends Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    BackHandler.addEventListener("hardwareBackPress", () => this.backPressed());
    this.askPermissions()
  }

  async componentDidUpdate() {
    if (this.props.hasCameraPermission && _.isNull(this.props.hasCameraRollPermission)) {
      let res = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      let cameraRollPermission = res.permissions.cameraRoll.status
      this.props.cameraRollPermissionGranted(cameraRollPermission === 'granted')
    }
    if (_.isNull(this.props.slick)) {
      this.props.configSlick(this.slick)
    }
  }

  async askPermissions() {
    let res = await Permissions.askAsync(Permissions.CAMERA);
    let cameraPermission = res.permissions.camera.status
    this.props.cameraPermissionGranted(cameraPermission === 'granted')
  }
  backPressed = () => {
    if (this.props.openImage) {
      this.props.discard();
      return true;
    } else if (this.props.prediction) {
      this.props.reset();
      return true;
    }
  };

  resetError = () => {
    this.props.resetError();
  };

  handleSwipe = (e, state) => {
    this.props.handleSlickSwipe(state.index);
  };

  render() {
    const slickSettings = {
      style: inlineStyles.wrapper,
      loop: false,
      showsPagination: false,
      index: this.props.slickIndex,
      onMomentumScrollEnd: (e, state) => this.handleSwipe(e, state)
    };
    if (this.props.error) {
      Alert.alert(
        "Oops!",
        "Something went terribly wrong!",
        [{ text: "Okay", onPress: () => this.resetError() }],
        { cancelable: false }
      );
    }
    if (_.isNull(this.props.hasCameraPermission) || _.isNull(this.props.hasCameraPermission)) {
      return <View style={{ width: "100%", height: "100%" }} />
    }
    return (
      <AuxWrapper>
        {!this.props.hasCameraPermission || !this.props.hasCameraPermission ?
          (<View style={inlineStyles.cameraView}>
            <Text style={{ textAlign: "center" }}>We need your permission to use the camera and camera roll!</Text>
          </View>)
          :
          (<AuxWrapper>
            <Slick
              {...slickSettings}
              ref={ref => {
                this.slick = ref;
              }}
            >
              <AuxWrapper style={inlineStyles.cameraView}>
                <Header text={"About"} />
                <InfoContainer />
              </AuxWrapper>
              <AuxWrapper style={inlineStyles.cameraView}>
                <Header text={"Camera"} />
                <CameraContainer />
              </AuxWrapper>
              <AuxWrapper style={inlineStyles.savedImagesView}>
                <Header text={"Images"} />
                <History />
              </AuxWrapper>
            </Slick>
            {this.props.openImage ? <Picture /> : <Toolbar slick={this.slick} cameraActive={true} />}
          </AuxWrapper>)}
        <PredictionModal />
      </AuxWrapper>
    );
  }
}

const mapStateToProps = state => {
  let {
    hasCameraPermission,
    hasCameraRollPermission,
    openImage,
    error,
    prediction,
    slickIndex,
    slick
  } = state;
  return {
    hasCameraPermission,
    hasCameraRollPermission,
    openImage,
    error,
    prediction,
    slickIndex,
    slick
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cameraPermissionGranted(status) {
      dispatch({ type: CAMERA_PERMISSION_GRANTED, status: status });
    },
    cameraRollPermissionGranted(status) {
      dispatch({ type: CAMERA_ROLL_PERMISSION_GRANTED, status: status });
      if (status) {
        dispatch(loadImages(102))
      }
    },
    resetError() {
      dispatch({ type: RESET_ERROR });
    },
    discard() {
      dispatch({ type: DISCARD_PIC });
    },
    reset() {
      dispatch({ type: RESET_PREDICTION });
    },
    configSlick(slickRef) {
      dispatch({ type: SLICK_CONFIG, slick: slickRef });
    },
    handleSlickSwipe(index) {
      dispatch({ type: SET_SLICK_INDEX, index: index });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

const inlineStyles = StyleSheet.create({
  wrapper: {
    color: "#fff"
  },
  cameraView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  savedImagesView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  }
});
