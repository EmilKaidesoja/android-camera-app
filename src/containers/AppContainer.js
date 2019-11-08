import React, { Component } from "react";
import { connect } from "react-redux";
import Slick from "react-native-slick";
import { StyleSheet, Alert, BackHandler, View } from "react-native";

import {
  askCameraPermission,
  askCameraRollPermission,
  RESET_ERROR,
  RESET_PREDICTION,
  DISCARD_PIC
} from "../../store/actions";

import CameraContainer from "../screens/Camera/CameraContainer";
import AuxWrapper from "../Utils/AuxWrapper";
import History from "../screens/Images/History";
import PredictionModal from "../screens/PredictionModal";
import Picture from "../screens/Picture";
import { ScreenOrientation } from "expo";
import Header from "../screens/Header";
import Toolbar from "../screens/Toolbar";

class AppContainer extends Component {

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    this.props.askPermissions()
    BackHandler.addEventListener("hardwareBackPress", () => this.backPressed())
  }

  backPressed = () => {
    if (this.props.openImage) {
      this.props.discard()
      return true
    } else if (this.props.prediction) {
      this.props.reset()
      return true
    }
  }

  resetError = () => {
    this.props.reset()
  }

  render() {
    if (this.props.error) {
      Alert.alert(
        'Oops!',
        'Something went terribly wrong!',
        [
          { text: 'Okay', onPress: () => this.resetError() },
        ],
        { cancelable: false },
      );
    }
    return (
      <AuxWrapper>
        <Slick style={inlineStyles.wrapper} loop={false} showsPagination={false}>
          <AuxWrapper style={inlineStyles.cameraView}>
            <Header text={"Camera"} />
            <CameraContainer />
          </AuxWrapper>
          <AuxWrapper style={inlineStyles.savedImagesView}>
            <Header text={"Images"} />
            <History />
          </AuxWrapper>
        </Slick>
        {this.props.openImage ? <Picture /> : <Toolbar  cameraActive={true} />}
        <PredictionModal />
      </AuxWrapper>
    );
  }
}

const mapStateToProps = state => {
  let { hasCameraPermission,
    hasCameraRollPermission,
    openImage,
    error,
    prediction } = state
  return {
    hasCameraPermission,
    hasCameraRollPermission,
    openImage,
    error,
    prediction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    askPermissions() {
      dispatch(askCameraPermission())
      dispatch(askCameraRollPermission())
    },
    reset() {
      dispatch({ type: RESET_ERROR })
    },
    discard() {
      dispatch({ type: DISCARD_PIC })
    },
    reset() {
      dispatch({ type: RESET_PREDICTION })
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
    fontSize: 30,
    fontWeight: "bold"
  }
});
